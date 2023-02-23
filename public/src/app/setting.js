class SettingApp extends HTMLElement {
  constructor () {
    super()
    this.style.display = 'none'
  }

  connectedCallback () {
    this.innerHTML = `
            <div>
                <div id="top-bar" draggable="true">
                    <p>Setting</p>
                    <button id="close-button">X</button>
                </div>
                <div id="latency-toggle-div" class="toggle-div">
                    <p>Latency</p>
                    <button id="toggle-latency" class="toggle-btn"></button>                    
                </div>
                <div class="s-toggle-div" style="margin-left: 1rem">
                    <label for="domain-input">Domain</label>    
                    <input class="input-os" type="text" id="domain-input" style="margin-left: 1rem">
                    <button class="toggle-btn" id="submit-domain" type="submit">Submit</button>
                </div>
                <div class="s-toggle-div" style="margin-left: 1rem">
                    <label for="refreshrate-input">Refresh Rate</label>    
                    <input class="input-os" type="text" id="refreshrate-input" style="margin-left: 1rem">
                    <button class="toggle-btn" id="submit-rr" type="submit">Submit</button>
                </div>
                <hr />
                <div>
                    <div id="date-toggle-div" class="toggle-div">
                        <p>Date</p>
                        <button id="toggle-date" class="toggle-btn"></button>
                    </div>
                    <div id="jour-toggle-div" class="s-toggle-div">
                        <p>Jour</p>
                        <button id="toggle-jour" class="toggle-btn"></button>
                    </div>
                    <div id="mois-toggle-div" class="s-toggle-div">
                        <p>Mois</p>
                        <button id="toggle-mois" class="toggle-btn"></button>
                    </div>
                    <div id="ans-toggle-div" class="s-toggle-div">
                        <p>Annee</p>
                        <button id="toggle-ans" class="toggle-btn"></button>
                    </div>
                </div>
                <hr />
                <div>
                    <div id="clock-toggle-div" class="toggle-div">
                        <p>Clock</p>
                        <button id="toggle-clock" class="toggle-btn"></button>
                    </div>
                    <div id="hour-toggle-div" class="s-toggle-div">
                        <p>Hour</p>
                        <button id="toggle-hour" class="toggle-btn"></button>
                    </div>
                    <div id="minute-toggle-div" class="s-toggle-div">
                        <p>Minute</p>
                        <button id="toggle-minute" class="toggle-btn"></button>
                    </div>
                    <div id="second-toggle-div" class="s-toggle-div">
                        <p>Second</p>
                        <button id="toggle-second" class="toggle-btn"></button>
                    </div>
                </div>
                <hr />
                <div>
                    <div id="battery-toggle-div" class="toggle-div">
                        <p>Battery</p>
                    <button id="toggle-battery" class="toggle-btn"></button>
                </div>
                <hr />
                <div>
                    <div id="vibration-toggle-div" class="toggle-div">
                        <p>Vibration show</p>
                        <button id="toggle-vibration" class="toggle-btn"></button>
                    </div>
                    <div id="vibration-switch-toggle-div" class="s-toggle-div">
                        <p>Vibration</p>
                        <button id="toggle-vibration-on" class="toggle-btn"></button>
                    </div>
                </ div>
            </div>
        `

    this.querySelector('#close-button').addEventListener('click', () => {
      this.style.display = 'none'
    })

    const toggleBtn = this.querySelector('#toggle-latency')
    toggleBtn.innerHTML = localStorage.getItem('latency') === 'none' ? 'Off' : 'On'
    toggleBtn.style.backgroundColor = localStorage.getItem('latency') === 'none' ? '#a43737' : '#6bdb02'
    toggleBtn.addEventListener('click', () => {
      const curLatency = localStorage.getItem('latency') === 'none' ? 'none' : 'inline-block'
      const newLatency = curLatency === 'none' ? 'inline-block' : 'none'
      document.getElementById('latency').style.display = newLatency
      toggleBtn.style.backgroundColor = newLatency === 'none' ? '#a43737' : '#6bdb02'
      toggleBtn.innerHTML = newLatency === 'none' ? 'Off' : 'On'
      localStorage.setItem('latency', newLatency)
    })

    const toggleDateBtn = this.querySelector('#toggle-date')
    toggleDateBtn.innerHTML = localStorage.getItem('date') === 'none' ? 'Off' : 'On'
    toggleDateBtn.style.backgroundColor = localStorage.getItem('date') === 'none' ? '#a43737' : '#6bdb02'
    toggleDateBtn.addEventListener('click', () => {
      const curDate = localStorage.getItem('date') === 'none' ? 'none' : 'inline-block'
      const newDate = curDate === 'none' ? 'inline-block' : 'none'
      document.getElementById('date').style.display = newDate
      toggleDateBtn.style.backgroundColor = newDate === 'none' ? '#a43737' : '#6bdb02'
      toggleDateBtn.innerHTML = newDate === 'none' ? 'Off' : 'On'
      localStorage.setItem('date', newDate)
    })

    const toggleJourBtn = this.querySelector('#toggle-jour')
    toggleJourBtn.innerHTML = localStorage.getItem('jour') === 'none' ? 'Off' : 'On'
    toggleJourBtn.style.backgroundColor = localStorage.getItem('jour') === 'none' ? '#a43737' : '#6bdb02'
    toggleJourBtn.addEventListener('click', () => {
      const curJour = localStorage.getItem('jour') === 'none' ? 'none' : 'inline-block'
      const newJour = curJour === 'none' ? 'inline-block' : 'none'
      document.getElementById('day').style.display = newJour
      toggleJourBtn.style.backgroundColor = newJour === 'none' ? '#a43737' : '#6bdb02'
      toggleJourBtn.innerHTML = newJour === 'none' ? 'Off' : 'On'
      localStorage.setItem('jour', newJour)
    })

    const toggleMoisBtn = this.querySelector('#toggle-mois')
    toggleMoisBtn.innerHTML = localStorage.getItem('mois') === 'none' ? 'Off' : 'On'
    toggleMoisBtn.style.backgroundColor = localStorage.getItem('mois') === 'none' ? '#a43737' : '#6bdb02'
    toggleMoisBtn.addEventListener('click', () => {
      const curMois = localStorage.getItem('mois') === 'none' ? 'none' : 'inline-block'
      const newMois = curMois === 'none' ? 'inline-block' : 'none'
      document.getElementById('month').style.display = newMois
      toggleMoisBtn.style.backgroundColor = newMois === 'none' ? '#a43737' : '#6bdb02'
      toggleMoisBtn.innerHTML = newMois === 'none' ? 'Off' : 'On'
      localStorage.setItem('mois', newMois)
    })

    const toggleAnsBtn = this.querySelector('#toggle-ans')
    toggleAnsBtn.innerHTML = localStorage.getItem('ans') === 'none' ? 'Off' : 'On'
    toggleAnsBtn.style.backgroundColor = localStorage.getItem('ans') === 'none' ? '#a43737' : '#6bdb02'
    toggleAnsBtn.addEventListener('click', () => {
      const curAns = localStorage.getItem('ans') === 'none' ? 'none' : 'inline-block'
      const newAns = curAns === 'none' ? 'inline-block' : 'none'
      document.getElementById('year').style.display = newAns
      toggleAnsBtn.style.backgroundColor = newAns === 'none' ? '#a43737' : '#6bdb02'
      toggleAnsBtn.innerHTML = newAns === 'none' ? 'Off' : 'On'
      localStorage.setItem('ans', newAns)
    })

    const toggleClockBtn = this.querySelector('#toggle-clock')
    toggleClockBtn.innerHTML = localStorage.getItem('clock') === 'none' ? 'Off' : 'On'
    toggleClockBtn.style.backgroundColor = localStorage.getItem('clock') === 'none' ? '#a43737' : '#6bdb02'
    toggleClockBtn.addEventListener('click', () => {
      const curClock = localStorage.getItem('clock') === 'none' ? 'none' : 'inline-block'
      const newClock = curClock === 'none' ? 'inline-block' : 'none'
      document.getElementById('clock').style.display = newClock
      toggleClockBtn.style.backgroundColor = newClock === 'none' ? '#a43737' : '#6bdb02'
      toggleClockBtn.innerHTML = newClock === 'none' ? 'Off' : 'On'
      localStorage.setItem('clock', newClock)
    })

    const toggleHourBtn = this.querySelector('#toggle-hour')
    toggleHourBtn.innerHTML = localStorage.getItem('hour') === 'none' ? 'Off' : 'On'
    toggleHourBtn.style.backgroundColor = localStorage.getItem('hour') === 'none' ? '#a43737' : '#6bdb02'
    toggleHourBtn.addEventListener('click', () => {
      const curHour = localStorage.getItem('hour') === 'none' ? 'none' : 'inline-block'
      const newHour = curHour === 'none' ? 'inline-block' : 'none'
      document.getElementById('hour').style.display = newHour
      toggleHourBtn.style.backgroundColor = newHour === 'none' ? '#a43737' : '#6bdb02'
      toggleHourBtn.innerHTML = newHour === 'none' ? 'Off' : 'On'
      localStorage.setItem('hour', newHour)
    })

    const toggleMinuteBtn = this.querySelector('#toggle-minute')
    toggleMinuteBtn.innerHTML = localStorage.getItem('minute') === 'none' ? 'Off' : 'On'
    toggleMinuteBtn.style.backgroundColor = localStorage.getItem('minute') === 'none' ? '#a43737' : '#6bdb02'
    toggleMinuteBtn.addEventListener('click', () => {
      const curMinute = localStorage.getItem('minute') === 'none' ? 'none' : 'inline-block'
      const newMinute = curMinute === 'none' ? 'inline-block' : 'none'
      document.getElementById('minute').style.display = newMinute
      toggleMinuteBtn.style.backgroundColor = newMinute === 'none' ? '#a43737' : '#6bdb02'
      toggleMinuteBtn.innerHTML = newMinute === 'none' ? 'Off' : 'On'
      localStorage.setItem('minute', newMinute)
    })

    const toggleSecondBtn = this.querySelector('#toggle-second')
    toggleSecondBtn.innerHTML = localStorage.getItem('second') === 'none' ? 'Off' : 'On'
    toggleSecondBtn.style.backgroundColor = localStorage.getItem('second') === 'none' ? '#a43737' : '#6bdb02'
    toggleSecondBtn.addEventListener('click', () => {
      const curSecond = localStorage.getItem('second') === 'none' ? 'none' : 'inline-block'
      const newSecond = curSecond === 'none' ? 'inline-block' : 'none'
      document.getElementById('second').style.display = newSecond
      toggleSecondBtn.style.backgroundColor = newSecond === 'none' ? '#a43737' : '#6bdb02'
      toggleSecondBtn.innerHTML = newSecond === 'none' ? 'Off' : 'On'
      localStorage.setItem('second', newSecond)
    })

    const toggleBatteryBtn = this.querySelector('#toggle-battery')
    toggleBatteryBtn.innerHTML = localStorage.getItem('battery') === 'none' ? 'Off' : 'On'
    toggleBatteryBtn.style.backgroundColor = localStorage.getItem('battery') === 'none' ? '#a43737' : '#6bdb02'
    toggleBatteryBtn.addEventListener('click', () => {
      const curBattery = localStorage.getItem('battery') === 'none' ? 'none' : 'inline-block'
      const newBattery = curBattery === 'none' ? 'inline-block' : 'none'
      document.getElementById('battery').style.display = newBattery
      toggleBatteryBtn.style.backgroundColor = newBattery === 'none' ? '#a43737' : '#6bdb02'
      toggleBatteryBtn.innerHTML = newBattery === 'none' ? 'Off' : 'On'
      localStorage.setItem('battery', newBattery)
    })

    const showVibrateBtn = document.querySelector('#toggle-vibration')
    showVibrateBtn.innerHTML = localStorage.getItem('vibration') === 'none' ? 'Off' : 'On'
    showVibrateBtn.style.backgroundColor = localStorage.getItem('vibration') === 'none' ? '#a43737' : '#6bdb02'
    showVibrateBtn.addEventListener('click', function () {
      const curVib = localStorage.getItem('vibration') === 'none' ? 'none' : 'inline-block'
      const newVib = curVib === 'none' ? 'inline-block' : 'none'
      document.getElementById('vibration').style.display = newVib
      showVibrateBtn.style.backgroundColor = newVib === 'none' ? '#a43737' : '#6bdb02'
      showVibrateBtn.innerHTML = newVib === 'none' ? 'Off' : 'On'
      localStorage.setItem('vibration', newVib)
    })

    const vibratingBtn = document.querySelector('#toggle-vibration-on')
    vibratingBtn.innerHTML = localStorage.getItem('vibrating') === 'false' ? 'Off' : 'On'
    vibratingBtn.style.backgroundColor = localStorage.getItem('vibrating') === 'false' ? '#a43737' : '#6bdb02'
    vibratingBtn.addEventListener('click', function () {
      const curVib = localStorage.getItem('vibrating')
      const newVib = curVib !== 'true'
      vibratingBtn.style.backgroundColor = !newVib ? '#a43737' : '#6bdb02'
      vibratingBtn.innerHTML = !newVib ? 'Off' : 'On'
      document.getElementById('vibration').innerHTML = 'Vibration : ' + (newVib ? 'On' : 'Off')
      localStorage.setItem('vibrating', newVib)
    })

    const settingApp = document.querySelector('#setting-app')

    settingApp.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text/plain', this.id)
    })

    const domainInput = document.querySelector('#domain-input')
    domainInput.value = localStorage.getItem('domain')

    const domainSubmit = document.querySelector('#submit-domain')
    domainSubmit.addEventListener('click', function () {
      localStorage.setItem('domain', domainInput.value)
      document.getElementById('latency').innerHTML = ''
    })

    const myTaskbar = document.querySelector('my-taskbar')
    
    const refreshrateInput = document.querySelector('#refreshrate-input')
    refreshrateInput.value = localStorage.getItem('refreshrate')
    document.querySelector('#submit-rr').addEventListener('click', function () {
      localStorage.setItem('interval', refreshrateInput.value)
      myTaskbar.dispatchEvent(new CustomEvent('my-event'))
      document.getElementById('latency').innerHTML = ''
    })
  }
}

customElements.define('my-setting', SettingApp)
