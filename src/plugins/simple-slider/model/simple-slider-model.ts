import {
  ISimpleSliderModel,
  IThumbsObserver,
  ISize,
  IThumbsPositions,
  IThumbPosition,
} from '../interfaces';

class SimpleSliderModel implements ISimpleSliderModel {
  private thumbsObservers: IThumbsObserver[];
  private orientation = 'horizontal';
  private min = 0;
  private max = 10;
  private thumbOneValue = 3;
  private thumbTwoValue = 7;
  private sliderSize = { width: 0, height: 0 };
  private thumbSize = { width: 0, height: 0 };

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
    this.thumbsObservers = this.thumbsObservers.filter(
      (registeredObserver) => registeredObserver !== observer,
    );
  }

  /**
   * Оповещение зарегистрированных наблюдателей об изменении позиций бегунков
   */
  notifyThumbsMoveObservers() {
    this.thumbsObservers.forEach((registeredObserver) =>
      registeredObserver.updateThumbsPosition(),
    );
  }

  /**
   * Установка размера слайдера
   * @param {ISize} size - новый размер слайдера
   */
  setSliderSize(size: ISize): void {
    this.sliderSize.width = size.width < 0 ? 0 : size.width;
    this.sliderSize.height = size.height < 0 ? 0 : size.height;
  }

  /**
   * Установка размера бегунка
   * @param {ISize} size - новый размер бегунка
   */
  setThumbSize(size: ISize): void {
    this.thumbSize.width = size.width < 0 ? 0 : size.width;
    this.thumbSize.height = size.height < 0 ? 0 : size.height;
  }

  getThumbsPositions(): IThumbsPositions {
    return {
      thumbOne: this.thumbValueToPos(this.thumbOneValue),
      thumbTwo: this.thumbValueToPos(this.thumbTwoValue),
    };
  }

  private thumbValueToPos(value: number): IThumbPosition {
    const percent = (value - this.min) / (this.max - this.min);

    if (this.orientation === 'horizontal') {
      return { left: this.sliderSize.width * percent, top: 0 };
    }

    return { left: 0, top: this.sliderSize.height * percent };
  }
}

export default SimpleSliderModel;
