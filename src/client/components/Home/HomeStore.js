import Rest from '../../helpers/rest';
import { observable, action, computed } from 'mobx';
import rest from '../../helpers/rest';

class HomeStore {
  message = 'I am ready to be displayed';
  @observable counter = 0;
  @computed get counterDisplay() {
    return `Counter: ${this.counter}`;
  }

  @action async incrementCounter() {
    console.log(await rest.service('customers').get('593a0a376e944134fc068fe8'))
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