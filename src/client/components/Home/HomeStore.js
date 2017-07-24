// import store from '../../helpers/simple-storage';
import { observable, action, computed } from 'mobx';

class HomeStore {
  message = 'I am ready to be displayed';
  @observable counter = 0;
  @computed get counterDisplay() {
    return `Counter: ${this.counter}`;
  }

  @action incrementCounter() {
    this.counter = this.counter + 1;
  }

  @action decrementCounter() {
    if (this.counter > 0) {
      this.counter = this.counter - 1;
    }
  }

  @action resetCounter() {
    this.counter = 0;
  }
}

export default new HomeStore();
