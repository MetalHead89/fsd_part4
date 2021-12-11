import { IObserver, Subscriber } from '../interfaces';

class Observer<T extends Record<string, unknown>> implements IObserver<T> {
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

  protected notify<K extends keyof T>(event: K, args: T[K]): void {
    if (this.observers[event]) {
      this.observers[event].forEach((func) => func(args));
    }
  }
}

export default Observer;
