/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */

import { ISubject, IObserversList, IObserver } from '../interfaces';

class Subject implements ISubject {
  private observers: IObserversList;

  constructor() {
    this.observers = {};
  }

  /**
   * Регистрация нового наблюдателя, подписанного на событие eventType
   * @param {IObserver} observer - регистрируемый наблюдатель
   * @param {string} eventType - тип события, при наступлении которого будет происходить оповещение
   * зарегистрированных наблюдателей
   */
  registerObserver(eventType: string, observer: IObserver): void {
    if (!Object.prototype.hasOwnProperty.call(this.observers, eventType)) {
      this.observers[eventType] = [];
    }
    this.observers[eventType].push(observer);
  }

  /**
   * Удаление наблюдателя, подписанного на событие eventType
   * @param {IObserver} observer - удаляемый наблюдатель
   * @param {string} eventType - тип события, на которое подписан удаляемый наблюдатель
   */
  removeObserver(eventType: string, observer: IObserver): void {
    this.observers[eventType] = this.observers[eventType].filter(
      (registeredObserver) => registeredObserver !== observer
    );
  }

  /**
   * Оповещение наблюдателей, подписанных на событие eventType о его наступлении
   * @param {string} eventType - тип события, при наступлении которого
   * будут оповещены подписанные на него наблюдатели
   */
  notifyThumbsMoveObservers(eventType: string): void {
    this.observers[eventType].forEach((registeredObserver) =>
      registeredObserver.update(eventType)
    );
  }
}

export default Subject;
