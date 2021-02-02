import { ISimpleSliderModel, IThumbsObserver } from '../interfaces';

class SimpleSliderModel implements ISimpleSliderModel {
  private thumbsObservers: IThumbsObserver[];

  constructor() {
    this.thumbsObservers = new Array();
  }

  /**
   * Регистрация нового наблюдателя, следящего за изменением позиций бегунков
   * @param {IThumbsObserver} observer - регистрируемый наблюдатель
   */
  registerObserver(observer: IThumbsObserver): void {
    this.thumbsObservers.push(observer);
  }

  /**
   * Удаление наблюдателя, следящего за изменением позиций бегунков
   * @param {IThumbsObserver} observer - удаляемый наблюдатель
   */
  removeObserver(observer: IThumbsObserver) {
    this.thumbsObservers = this.thumbsObservers.filter((registeredObserver) => {
      registeredObserver !== observer;
    });
  }

  /**
   * Оповещение зарегистрированных наблюдателей об изменении позиций бегунков
   */
  notifyThumbsMoveObservers() {
    this.thumbsObservers.forEach((registeredObserver) =>
      registeredObserver.updateThumbsPosition()
    );
  }
}

export default SimpleSliderModel;
