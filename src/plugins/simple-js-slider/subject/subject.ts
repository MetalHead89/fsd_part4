/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */

import { ISubject, IObserversList, IObserver } from '../interfaces';

class Subject implements ISubject {
  private observers: IObserversList;

  constructor() {
    this.observers = {};
  }

  register(eventType: string, observer: IObserver): void {
    if (!Object.prototype.hasOwnProperty.call(this.observers, eventType)) {
      this.observers[eventType] = [];
    }
    this.observers[eventType].push(observer);
  }

  unsubscribe(eventType: string, observer: IObserver): void {
    this.observers[eventType] = this.observers[eventType].filter(
      (registeredObserver) => registeredObserver !== observer
    );
  }

  notify(eventType: string): void {
    if (Object.prototype.hasOwnProperty.call(this.observers, eventType)) {
      this.observers[eventType].forEach((registeredObserver) =>
        registeredObserver.update(eventType)
      );
    }
  }
}

export default Subject;
