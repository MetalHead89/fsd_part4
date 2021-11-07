import { IObserverNew, IObserversList } from '../new-interfaces';

class ObserverNew implements IObserverNew {
  private observers: IObserversList;

  constructor() {
    this.observers = {};
  }

  register(event: string, func: () => void): void {
    this.observers[event] = func;
  }

  unsubscribe(event: string): void {
    delete this.observers[event];
  }

  notify(event: string): void {
    if (this.observers[event]) {
      this.observers[event]();
    }
  }
}

export default ObserverNew;
