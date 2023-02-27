import MyStorage from '../MyStorage.js';

class ClockApp extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none';
  }

  connectedCallback() {
    this.innerHTML = `
            <div>
                <div id="top-bar" draggable="true">
                    <p>Clock</p>
                    <button id="close-button">X</button>
                </div>
                <div id="tab-btn">
                    <button id="horloge">Time</button>
                    <button id="chrono">Chronometre</button>
                    <button id="minuterie">Minuterie</button>
                </div>
                <div id="tab-content">
                    <div id="clock">
                        <div class="clock-hour">
                            <div class="hr" id="hr"></div>
                        </div>
                        <div class="clock-min">
                            <div class="mn" id="mn"></div>
                        </div>
                        <div class="clock-sec">
                            <div class="sc" id="sc"></div>
                        </div>
                    </div>
                    <div id="chronoId" style="display :none">
                    </div>
                    <div id="minuterieId" style="display: none">
                    </div>
                </div>
            </div>
        `;

    let currTab = 'horloge';
    let running;

    this.querySelector('#chronoId').innerHTML = `
            <div>
              <p id="chrono-input"></p>
            </div>
            <div id="clock-btn">
                <button id="startChrono">Start</button>
                <button id="stopChrono">Stop</button>
                <button id="resetChrono">Reset</button>
            </div>
            <div id=""histo-clock>
                <p class="histo-time" id="histo-time-0"> </p>
                <p class="histo-time" id="histo-time-1"> </p>
                <p class="histo-time" id="histo-time-2"> </p>
                <p class="histo-time" id="histo-time-3"> </p>
                <p class="histo-time" id="histo-time-4"> </p>
                <p class="histo-time" id="histo-time-5"> </p>
                <p class="histo-time" id="histo-time-6"> </p>
            </div>
        `;

    this.querySelector('#minuterieId').innerHTML = `
            <div id="minuterieElem">
                <div>
                <p id="minuterie-output">Please set a timer in minutes</p>
                </div>
                <div id="minuterie-inp" style="justify-content: center">
                    <input type="number" id="minuterie-input" class="input-os" placeholder="Enter time in minutes">
                </div>
                <div id="clock-btn">
                    <button id="startMinuterie">Start</button>
                    <button id="stopMinuterie">Stop</button>
                    <button id="resetMinuterie">Reset</button>
                </div>
            </div>
        `;
    let timer;

    this.querySelector('#minuterie-input').addEventListener('change', () => {
      const minutes = this.querySelector('#minuterie-input').value;
      if (minutes < 0) {
        this.querySelector('#minuterie-output').innerHTML = 'Please set a timer in a positive minute';
        return;
      } if (minutes % 1 !== 0) {
        this.querySelector('#minuterie-output').innerHTML = 'Please set a timer in a whole minute';
        return;
      }
      const hour = Math.floor(minutes / 60) < 10 ? `0${Math.floor(minutes / 60)}` : Math.floor(minutes / 60);
      const min = minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60;
      this.querySelector('#minuterie-output').innerHTML = `${hour} : ${min} : 00`;
    });

    document.getElementById('startMinuterie').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      const input = document.getElementById('minuterie-input').value;
      const output = document.getElementById('minuterie-output');

      if (!input || input === '' || input.trim(' ') === '') {
        output.textContent = 'Please set a timer in minutes';
        return;
      }
      if (input < 0) {
        return;
      }
      if (input % 1 !== 0) {
        return;
      }

      const timeInSeconds = input * 60;
      const startTime = Date.now();

      timer = setInterval(() => {
        const elapsedTime = Math.round((Date.now() - startTime) / 1000);
        const remainingTime = timeInSeconds - elapsedTime;

        if (remainingTime <= 0) {
          clearInterval(timer);
          output.textContent = 'Time is up!';
          const sound = new Audio('./voices/crabbity-giggity.mp3');
          sound.play();
          if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
            navigator.vibrate(200);
          }
          if (Notification.permission === 'granted') {
            const notification = new Notification('Time is up!', {
              body: 'Your timer has finished!',
            });
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
              if (permission === 'granted') {
                const notification = new Notification('Time is up!', {
                  body: 'Your timer has finished!',
                });
              }
            });
          }
          return;
        }
        const hour = Math.floor(remainingTime / 3600);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const display = `${hour < 10 ? `0${hour}` : hour} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
        output.textContent = display;
      }, 100);
    });

    document.getElementById('stopMinuterie').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      clearInterval(timer);
    });

    document.getElementById('resetMinuterie').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      clearInterval(timer);
      document.getElementById('minuterie-output').textContent = 'Please set a timer in minutes';
      document.getElementById('minuterie-input').value = '';
    });

    let endClick = 0;
    const chronoInput = this.querySelector('#chrono-input');
    chronoInput.innerHTML = '00:00:00:000';
    let startTime = new Date();

    this.querySelector('#startChrono').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      if (!running) {
        if (!startTime) {
          startTime = new Date();
        }
        running = setInterval(() => {
          const currentTime = new Date();
          const timeElapsed = new Date(currentTime - startTime);
          let hours = timeElapsed.getUTCHours();
          let minutes = timeElapsed.getUTCMinutes();
          let seconds = timeElapsed.getUTCSeconds();
          let milliseconds = timeElapsed.getUTCMilliseconds();
          if (hours < 10) {
            hours = `0${hours}`;
          }
          if (minutes < 10) {
            minutes = `0${minutes}`;
          }
          if (seconds < 10) {
            seconds = `0${seconds}`;
          }
          if (milliseconds < 10) {
            milliseconds = `00${milliseconds}`;
          } else if (milliseconds < 100) {
            milliseconds = `0${milliseconds}`;
          }
          this.querySelector('#chrono-input').innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
        });
      }
    });

    this.querySelector('#stopChrono').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      if (running) {
        clearInterval(running);
        running = false;
        this.querySelector(`#histo-time-${endClick % 7}`).innerHTML = this.querySelector('#chrono-input').innerHTML;
        endClick++;
      }
    });

    this.querySelector('#resetChrono').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      if (!running) {
        this.querySelector('#chrono-input').innerHTML = '00:00:00';
        startTime = null;
        for (let i = 0; i < 7; i++) {
          this.querySelector(`#histo-time-${i}`).innerHTML = '';
        }
      }
    });

    function getIdCurrTab() {
      if (currTab === 'horloge') {
        return '#clock';
      } if (currTab === 'chrono') {
        return '#chronoId';
      } if (currTab === 'minuterie') {
        return '#minuterieId';
      }
    }
    this.querySelector('#horloge').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      if (currTab !== 'horloge') {
        this.querySelector(getIdCurrTab(currTab)).style.display = 'none';
        this.querySelector('#clock').style.display = 'flex';
        currTab = 'horloge';
      }
    });
    this.querySelector('#chrono').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      if (currTab !== 'chrono') {
        this.querySelector('#chrono-input').innerHTML = '00:00:00';
        startTime = null;
        for (let i = 0; i < 7; i++) {
          this.querySelector(`#histo-time-${i}`).innerHTML = '';
        }
        this.querySelector(getIdCurrTab(currTab)).style.display = 'none';
        this.querySelector('#chronoId').style.display = 'block';
        currTab = 'chrono';
      }
    });
    this.querySelector('#minuterie').addEventListener('click', () => {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      if (currTab !== 'minuterie') {
        this.querySelector(getIdCurrTab(currTab)).style.display = 'none';
        this.querySelector('#minuterieId').style.display = 'block';
        currTab = 'minuterie';
      }
    });

    const deg = 6;

    const hr = document.querySelector('#hr');
    const mn = document.querySelector('#mn');
    const sc = document.querySelector('#sc');

    setInterval(() => {
      const day = new Date();
      const hh = day.getHours() * 30;
      const mm = day.getMinutes() * deg;
      const ss = day.getSeconds() * deg;
      hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
      mn.style.transform = `rotateZ(${mm}deg)`;
      sc.style.transform = `rotateZ(${ss}deg)`;
    });

    this.querySelector('#close-button').addEventListener('click', () => {
      this.style.display = 'none';
    });
  }
}

customElements.define('my-clock', ClockApp);
