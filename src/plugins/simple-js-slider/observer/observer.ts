import { IObserverNew, IObserversList } from '../new-interfaces';

class ObserverNew implements IObserverNew {
  private observers: IObserversList;

  constructor() {
    this.observers = {};
  }

  register(event: string, func: (args?: any) => void): void {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }

    this.observers[event].push(func);
  }

  unsubscribe(event: string): void {
    delete this.observers[event];
  }

  notify(event: string, args?: any): void {
    if (this.observers[event]) {
      this.observers[event].forEach((func) => func(args));
    }
  }
}

export default ObserverNew;
