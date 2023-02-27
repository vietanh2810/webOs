import MyStorage from '../MyStorage.js';

class MyDesktop extends HTMLElement {
  constructor() {
    super();
    this.isLoggedIn = false;
    this.action = '';
    this.render(this.isLoggedIn);
  }

  connectedCallback() {
    this.addEventListener('logout', () => {
      this.isLogged = false;
      location.reload();
    });
  }

  login(username, password) {
    if (MyStorage.signIn(username, password)) {
      this.isLoggedIn = true;
      this.render(this.isLoggedIn);
    }
  }

  register(username, password) {
    if (MyStorage.signUp(username, password)) {
      this.isLoggedIn = true;
      this.render(this.isLoggedIn);
    }
  }

  render(isLoggedIn) {
    if (!isLoggedIn) {
      this.innerHTML = `
        <div class="login-form">
          <form>
            <label>
              Username:
              <input type="text" name="username" id="username">
            </label>
            <label>
              Password:
              <input type="password" name="password" id="password">
            </label>
            <button type="submit" value="login" id="login-btn">Log in</button>
            <button type="submit" value="register" id="register-btn">Sign up</button>
          </form>
        </div>
      `;

      const loginBtn = document.getElementById('login-btn');
      const registerBtn = document.getElementById('register-btn');

      loginBtn.addEventListener('click', () => {
        this.action = 'login';
      });

      registerBtn.addEventListener('click', () => {
        this.action = 'register';
      });

      const form = document.querySelector('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = form.elements.username.value;
        const password = form.elements.password.value;

        if (this.action === 'login') {
          this.login(username, password);
        } else if (this.action === 'register') {
          this.register(username, password);
        }

        event.preventDefault();
      });
    } else {
      this.innerHTML = `
        <my-taskbar id="taskbar"></my-taskbar>
        <my-setting id="setting-app"></my-setting>
        <my-calculator id="calculator-app"></my-calculator>
        <my-tic-tac-toe id="tic-tac-toe-app"></my-tic-tac-toe>
        <my-clock id="clock-app"></my-clock>
        <div id="main"></div>
      `;
    }
  }
}

customElements.define('my-desktop', MyDesktop);
