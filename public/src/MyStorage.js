export default class MyStorage {
  static #data = {
    users: [
      {
        id: 1,
        username: 'testuser',
        password: '123456',
        settings: {
          latency: null,
          date: null,
          jour: null,
          mois: null,
          ans: null,
          clock: null,
          hour: null,
          minute: null,
          second: null,
          battery: null,
          vibration: null,
          vibrating: null,
          domain: null,
          interval: null,
          refreshrate: null,
        },
      },
    ],
    currentUser: null,
  };

  static get data() {
    const jsonData = localStorage.getItem('my-key');
    MyStorage.#data = JSON.parse(jsonData) || MyStorage.#data;
    return MyStorage.#data;
  }

  static set data(value) {
    MyStorage.#data = value;
    const jsonData = JSON.stringify(value);
    localStorage.setItem('my-key', jsonData);
  }

  static getUserById(id) {
    const { users } = MyStorage.data;
    return users.find((user) => user.id === id);
  }

  static addUser(user) {
    const { users } = MyStorage.data;
    if (!users) {
      MyStorage.data = { users: [user], currentUser: user.id };
    } else {
      MyStorage.data = { users: [...users, user], currentUser: user.id };
    }
  }

  static getCurrentUser() {
    const { users, currentUser } = MyStorage.data;
    if (!currentUser) {
      return null;
    }
    return users.find((user) => user.id === currentUser);
  }

  static updateUser(id, userData) {
    const { users } = MyStorage.data;
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, settings: userData };
      }
      return user;
    });
    MyStorage.data = { users: updatedUsers, currentUser: MyStorage.data.currentUser };
  }

  static removeUser(id) {
    const { users } = MyStorage.data;
    const filteredUsers = users.filter((user) => user.id !== id);
    MyStorage.data = { users: filteredUsers, currentUser: MyStorage.data.currentUser };
  }

  static getUserSettings(id) {
    const user = MyStorage.getUserById(id);
    return user.settings;
  }

  static setUserSettings(id, value) {
    const user = MyStorage.getUserById(id);
    user.settings = value;
    MyStorage.updateUser(id, user.settings);
  }

  static signUp(username, password) {
    const users = MyStorage.data.users || [];

    if (users.length === 0) {
      // pass
    } else if (users.find((user) => user.username === username)) {
      alert('Username already exists.');
      return null;
    }
    const newUser = {
      id: users.length + 1,
      username,
      password,
      settings: {
        latency: null,
        date: null,
        jour: null,
        mois: null,
        ans: null,
        clock: null,
        hour: null,
        minute: null,
        second: null,
        battery: null,
        vibration: null,
        vibrating: null,
        domain: null,
        interval: null,
        refreshrate: null,
      },
    };
    MyStorage.addUser(newUser);
    return newUser;
  }

  static signIn(username, password) {
    const users = MyStorage.data.users || [];
    const foundUser = users.find((user) => user.username === username && user.password === password);

    if (foundUser) {
      MyStorage.data = { ...MyStorage.data, currentUser: foundUser.id };
      return foundUser;
    }
    alert('Incorrect username or password.');

    return null;
  }

  static getCurrentUserValue(variableName) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const value = currentUser.settings[variableName];
      if (value !== undefined) {
        return value;
      }
    }
    return null;
  }

  static setCurrentUserValue(key, value) {
    const currentUser = MyStorage.getCurrentUser();
    if (!currentUser) {
      return;
    }
    const updatedSettings = { ...currentUser.settings, [key]: value };
    currentUser.settings = updatedSettings;
    MyStorage.updateUser(currentUser.id, updatedSettings);
  }
}
