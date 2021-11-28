import { IObserver, IObserversList } from '../interfaces';

class ObserverNew implements IObserver {
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
