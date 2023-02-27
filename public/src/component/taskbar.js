import MyStorage from '../MyStorage.js';

class MyTaskbar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div id="taskbar-apps">
          <div>
            <div id="menu-button">Menu</div>
            <div id="vibration"></div>
            <div id="battery"></div>
            <div id="latency"></div>
            <div id="date">
              <div id="dayOfWeek"></div>
              <div id="day"></div>
              <div id="month"></div>
              <div id="year"></div>
            </div>
            <div id="clock">
              <div id="hour"></div>
              <div id="minute"></div>
              <div id="second"></div>
            </div>
          </div>
            <div id="popup">
              <div id="setting"></div>
              <div id="calculator"></div>
              <div id="tic-tac-toe"></div>
              <div id="clockapp"></div>
              <div id="logout"></div>
            </div>
            
        </div>

      `;
  }

  connectedCallback() {
    function updateDate() {
      const date = new Date();
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour12: false,
      };

      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formattedDate = formatter.format(date);
      const dateArray = formattedDate.split(' ');

      this.querySelector('#dayOfWeek').innerHTML = dateArray[0].substring(0, dateArray[0].length - 1);
      this.querySelector('#month').innerHTML = dateArray[1];
      this.querySelector('#day').innerHTML = dateArray[2].substring(0, dateArray[2].length - 1);
      this.querySelector('#year').innerHTML = dateArray[3];
    }
    this.querySelector('#date').style.display = MyStorage.getCurrentUserValue('date');
    this.querySelector('#month').style.display = MyStorage.getCurrentUserValue('month');
    this.querySelector('#day').style.display = MyStorage.getCurrentUserValue('day');
    this.querySelector('#year').style.display = MyStorage.getCurrentUserValue('ans');

    setInterval(updateDate.bind(this), 1000);

    // Get current time and update time div
    function updateTime() {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const separatorHours = hours < 10 ? '0' : '';
      const separatorMinutes = minutes < 10 ? ' : 0' : ' : ';
      const separatorSeconds = seconds < 10 ? ' : 0' : ' : ';
      this.querySelector('#hour').innerHTML = separatorHours + hours;
      this.querySelector('#minute').innerHTML = separatorMinutes + minutes;
      this.querySelector('#second').innerHTML = separatorSeconds + seconds;
    }

    this.querySelector('#hour').style.display = MyStorage.getCurrentUserValue('hour');
    this.querySelector('#minute').style.display = MyStorage.getCurrentUserValue('minute');
    this.querySelector('#second').style.display = MyStorage.getCurrentUserValue('second');
    this.querySelector('#clock').style.display = MyStorage.getCurrentUserValue('clock');

    setInterval(updateTime.bind(this), 1000);

    navigator.getBattery().then((battery) => {
      function updateBattery() {
        const charging = battery.charging ? ' (charging)' : '';
        this.querySelector('#battery').innerHTML = `${Math.floor(battery.level * 100)}%${charging}`;
      }
      updateBattery.bind(this)();
      battery.addEventListener('levelchange', updateBattery.bind(this));
      battery.addEventListener('chargingchange', updateBattery.bind(this));
    });

    this.querySelector('#battery').style.display = MyStorage.getCurrentUserValue('battery');

    function updateLatency() {
      const domain = MyStorage.getCurrentUserValue('domain') === null ? 'google' : MyStorage.getCurrentUserValue('domain');
      MyStorage.setCurrentUserValue('domain', domain);
      const tmp = MyStorage.getCurrentUserValue('interval') === null ? 3 : MyStorage.getCurrentUserValue('interval');
      MyStorage.setCurrentUserValue('refreshrate', tmp);
      const res = domain.charAt(0).toUpperCase() + domain.slice(1);
      const startTime = Date.now();
      const image = new Image();
      image.src = `https://www.${domain}.com/favicon.ico?${startTime}`;
      image.onload = function () {
        const latency = Date.now() - startTime;
        this.querySelector('#latency').innerHTML = `${res} : ${latency} ms rate : ${tmp}s`;
      }.bind(this);
    }

    this.querySelector('#latency').style.display = MyStorage.getCurrentUserValue('latency');

    function changeInterval() {
      const interval = MyStorage.getCurrentUserValue('interval') || 3;
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        updateLatency.bind(this)();
      }, interval * 1000);
    }

    const interval = MyStorage.getCurrentUserValue('interval') || 3;
    let intervalId = setInterval(() => {
      updateLatency.bind(this)();
    }, interval * 1000);

    this.addEventListener('my-event', () => {
      changeInterval.bind(this)();
    });

    const menuButton = this.querySelector('#menu-button');
    menuButton.innerHTML = `
        <button id="menu-button">Menu</button>
      `;
    menuButton.addEventListener('mouseover', () => {
      this.querySelector('#popup').style.display = 'block';
    });

    const popup = this.querySelector('#popup');
    popup.addEventListener('mouseout', (event) => {
      if (!popup.contains(event.relatedTarget) && !menuButton.contains(event.relatedTarget)) {
        popup.style.display = 'none';
      }
    });

    const settingButton = this.querySelector('#setting');
    settingButton.innerHTML = `
        <button id="setting">Setting</button>
      `;
    settingButton.addEventListener('click', () => {
      const app = document.getElementById('setting-app');
      document.body.appendChild(app);
      app.style.display = 'block';
      popup.style.display = 'none';
    });

    const calculatorButton = this.querySelector('#calculator');
    calculatorButton.innerHTML = `
        <button id="calculator">Calculator</button>
      `;
    calculatorButton.addEventListener('click', () => {
      const app = document.getElementById('calculator-app');
      document.body.appendChild(app);
      app.style.display = 'block';
      popup.style.display = 'none';
    });

    const ticTacToe = this.querySelector('#tic-tac-toe');
    ticTacToe.innerHTML = `
        <button id="tic-tac-toe">Tic Tac Toe</button>
      `;
    ticTacToe.addEventListener('click', () => {
      const app = document.getElementById('tic-tac-toe-app');
      document.body.appendChild(app);
      app.style.display = 'block';
      popup.style.display = 'none';
    });

    const clock = this.querySelector('#clockapp');
    clock.innerHTML = `
        <button id="clockapp">Clock</button>
      `;
    clock.addEventListener('click', () => {
      const app = document.getElementById('clock-app');
      document.body.appendChild(app);
      app.style.display = 'block';
      popup.style.display = 'none';
    });

    const isVibrationOn = MyStorage.getCurrentUserValue('vibrating') === null ? 'true' : MyStorage.getCurrentUserValue('vibrating');
    MyStorage.setCurrentUserValue('vibrating', isVibrationOn);
    const vibration = this.querySelector('#vibration');
    vibration.innerHTML = ` Vibrations: ${isVibrationOn === 'true' ? 'On' : 'Off'} `;
    const isShowVibration = MyStorage.getCurrentUserValue('vibration') === null ? 'inline-block' : MyStorage.getCurrentUserValue('vibration');
    MyStorage.setCurrentUserValue('vibration', isShowVibration);
    document.getElementById('vibration').style.display = isShowVibration;

    const myDesktop = document.getElementById('desktop');

    const logOut = this.querySelector('#logout');
    logOut.innerHTML = `
      <button id="logout">Log Out</button>
    `;
    logOut.addEventListener('click', () => {
      myDesktop.dispatchEvent(new CustomEvent('logout'));
    });
  }
}

customElements.define('my-taskbar', MyTaskbar);
