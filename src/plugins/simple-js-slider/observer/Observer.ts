/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IObserver, IObserversList } from '../interfaces';

class Observer implements IObserver {
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

  unsubscribe(event: string, func: (args?: any) => void): void {
    this.observers[event] = this.observers[event].filter((f) => f !== func);

    if (this.observers[event].length === 0) {
      delete this.observers[event];
    }
  }

  notify(event: string, args?: any): void {
    if (this.observers[event]) {
      this.observers[event].forEach((func) => func(args));
    }
  }
}

export default Observer;
