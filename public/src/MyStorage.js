export default class MyStorage {
  static #data = {
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
  };

  // getter/setter methods for data property
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

  // method for interacting with localStorage
  static getItem(key) {
    const { data } = MyStorage;
    return data[key];
  }

  static setItem(key, value) {
    const { data } = MyStorage;
    data[key] = value;
    MyStorage.data = data;
  }

  static removeItem(key) {
    const { data } = MyStorage;
    delete data[key];
    MyStorage.data = data;
  }
}
