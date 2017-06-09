import Rest from '../../helpers/rest';
import { observable, action, computed } from 'mobx';

class HomeStore {
  message = 'I am ready to be displayed';
  @observable counter = 0;
  @computed get counterDisplay() {
    return `Counter: ${this.counter}`;
  }

  @action async incrementCounter() {
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