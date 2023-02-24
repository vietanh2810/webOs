class MyTaskbar extends HTMLElement {
  constructor () {
    super()
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
            </div>
            
        </div>

      `
  }

  connectedCallback () {
    // Get current date and update date div
    function updateDate () {
      const date = new Date()
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour12: false
      }

      const formatter = new Intl.DateTimeFormat('en-US', options)
      const formattedDate = formatter.format(date)
      const dateArray = formattedDate.split(' ')

      this.querySelector('#dayOfWeek').innerHTML = dateArray[0].substring(0, dateArray[0].length - 1)
      this.querySelector('#month').innerHTML = dateArray[1]
      this.querySelector('#day').innerHTML = dateArray[2].substring(0, dateArray[2].length - 1)
      this.querySelector('#year').innerHTML = dateArray[3]
    }
    this.querySelector('#date').style.display = localStorage.getItem('date')
    this.querySelector('#month').style.display = localStorage.getItem('month')
    this.querySelector('#day').style.display = localStorage.getItem('day')
    this.querySelector('#year').style.display = localStorage.getItem('ans')

    setInterval(updateDate.bind(this), 1000)

    // Get current time and update time div
    function updateTime () {
      const time = new Date()
      const hours = time.getHours()
      const minutes = time.getMinutes()
      const seconds = time.getSeconds()
      const separatorHours = hours < 10 ? '0' : ''
      const separatorMinutes = minutes < 10 ? ' : 0' : ' : '
      const separatorSeconds = seconds < 10 ? ' : 0' : ' : '
      this.querySelector('#hour').innerHTML = separatorHours + hours
      this.querySelector('#minute').innerHTML = separatorMinutes + minutes
      this.querySelector('#second').innerHTML = separatorSeconds + seconds
    }
    this.querySelector('#hour').style.display = localStorage.getItem('hour')
    this.querySelector('#minute').style.display = localStorage.getItem('minute')
    this.querySelector('#second').style.display = localStorage.getItem('second')
    this.querySelector('#clock').style.display = localStorage.getItem('clock')

    setInterval(updateTime.bind(this), 1000)

    // Get battery level and update battery div
    navigator.getBattery().then(function (battery) {
      function updateBattery () {
        const charging = battery.charging ? ' (charging)' : ''
        this.querySelector('#battery').innerHTML = Math.floor(battery.level * 100) + '%' + charging
      }
      updateBattery.bind(this)()
      battery.addEventListener('levelchange', updateBattery.bind(this))
      battery.addEventListener('chargingchange', updateBattery.bind(this))
    }.bind(this))

    this.querySelector('#battery').style.display = localStorage.getItem('battery')  

    function updateLatency () {
      const domain = localStorage.getItem('domain') === null ? 'google' : localStorage.getItem('domain')
      localStorage.setItem('domain', domain)
      const tmp = localStorage.getItem('interval') === null ? 3 : localStorage.getItem('interval')
      if (localStorage.getItem('interval') !== tmp) {
        console.log('interval changed')
      }
      localStorage.setItem('refreshrate', tmp)
      const res = domain.charAt(0).toUpperCase() + domain.slice(1)
      const startTime = Date.now()
      const image = new Image()
      image.src = 'https://www.' + domain + '.com/favicon.ico?' + startTime
      image.onload = function () {
        const latency = Date.now() - startTime
        this.querySelector('#latency').innerHTML = res + ' : ' + latency + ' ms rate : ' + tmp + 's'
      }.bind(this)
    }
    
    this.querySelector('#latency').style.display = localStorage.getItem('latency')
    
    function changeInterval () {
      const interval = localStorage.getItem('interval') || 3;
      // Stop the existing interval and start a new one with the updated interval value
      clearInterval(intervalId);
      intervalId = setInterval(function () {
        updateLatency.bind(this)()
        console.log('interval : ' + interval)
      }.bind(this), interval * 1000)
    }
    
    let interval = localStorage.getItem('interval') || 3;
    let intervalId = setInterval(function () {
      updateLatency.bind(this)()
      console.log('interval : ' + interval)
    }.bind(this), interval * 1000);

    this.addEventListener('my-event', () => {
      changeInterval.bind(this)()
    })

    // Get current date and update date div

    const menuButton = this.querySelector('#menu-button')
    menuButton.innerHTML = `
        <button id="menu-button">Menu</button>
      `
    menuButton.addEventListener('mouseover', function () {
      this.querySelector('#popup').style.display = 'block'
    }.bind(this))

    const popup = this.querySelector('#popup')
    popup.addEventListener('mouseout', function (event) {
      if (!popup.contains(event.relatedTarget) && !menuButton.contains(event.relatedTarget)) {
        popup.style.display = 'none'
      }
    })

    const settingButton = this.querySelector('#setting')
    settingButton.innerHTML = `
        <button id="setting">Setting</button>
      `
    settingButton.addEventListener('click', () => {
      const app = document.getElementById('setting-app')
      document.body.appendChild(app)
      app.style.display = 'block'
      popup.style.display = 'none'
    })

    const calculatorButton = this.querySelector('#calculator')
    calculatorButton.innerHTML = `
        <button id="calculator">Calculator</button>
      `
    calculatorButton.addEventListener('click', () => {
      const app = document.getElementById('calculator-app')
      document.body.appendChild(app)
      app.style.display = 'block'
      popup.style.display = 'none'
    })

    const ticTacToe = this.querySelector('#tic-tac-toe')
    ticTacToe.innerHTML = `
        <button id="tic-tac-toe">Tic Tac Toe</button>
      `
    ticTacToe.addEventListener('click', () => {
      const app = document.getElementById('tic-tac-toe-app')
      document.body.appendChild(app)
      app.style.display = 'block'
      popup.style.display = 'none'
    })

    const clock = this.querySelector('#clockapp')
    clock.innerHTML = `
        <button id="clockapp">Clock</button>
      `
    clock.addEventListener('click', () => {
      const app = document.getElementById('clock-app')
      document.body.appendChild(app)
      app.style.display = 'block'
      popup.style.display = 'none'
    })

    const isVibrationOn = localStorage.getItem('vibration') === null ? true : localStorage.getItem('vibration')
    localStorage.setItem('vibration', isVibrationOn)
    const vibration = this.querySelector('#vibration')
    vibration.innerHTML = ` Vibrations: ${isVibrationOn === true ? 'On' : 'Off'} `
    const isShowVibration = localStorage.getItem('vibration') === null ? true : localStorage.getItem('vibration')
    localStorage.setItem('vibration', isShowVibration)
    document.getElementById('vibration').style.display = isShowVibration

    const isVibrating = localStorage.getItem('vibrating') === null ? true : localStorage.getItem('vibrating')
    localStorage.setItem('vibrating', isVibrating)
  }
}

customElements.define('my-taskbar', MyTaskbar)
