
import { observable, action } from 'mobx';

class HomeStore {
  @observable counter = 0;
  message = 'I am ready to be displayed';

  @action incrementCounter() {
    this.counter++;
  }

  @action decrementCounter() {
    if (this.counter > 0)
    this.counter--;
  }

  @action resetCounter() {
    this.counter = 0;
  }
}

export default new HomeStore();