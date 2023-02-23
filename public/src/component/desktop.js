class MyDesktop extends HTMLElement {
  constructor () {
    super()
    this.innerHTML = `
        <my-taskbar id="taskbar"></my-taskbar>
        <div id="main"></div>
      `
  }
}

customElements.define('my-desktop', MyDesktop)
