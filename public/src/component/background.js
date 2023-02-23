class MyBackground extends HTMLElement {
  constructor () {
    super()
    this.style.backgroundImage = 'url("../../assets/background.jpg")'
    this.style.backgroundSize = 'cover'
    this.style.backgroundRepeat = 'no-repeat'
  }
}

customElements.define('my-background', MyBackground)
