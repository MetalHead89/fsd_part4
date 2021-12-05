/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Subscriber } from '../interfaces';

class Observer<T extends Record<string, unknown>> {
  private observers: Record<keyof T, Subscriber<T>[]>;

  constructor() {
    this.observers = {} as Record<keyof T, Subscriber<T>[]>;
  }

  register<K extends keyof T>(event: K, func: Subscriber<T>): void {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }

    this.observers[event].push(func);
  }

  unsubscribe<K extends keyof T>(event: K, func: Subscriber<T>): void {
    this.observers[event] = this.observers[event].filter((f) => f !== func);
  }

  notify<K extends keyof T>(event: K, args?: T[K]): void {
    if (this.observers[event]) {
      this.observers[event].forEach((func) => func(args));
    }
  }
}

export default Observer;
