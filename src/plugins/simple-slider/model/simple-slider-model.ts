/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

import {
  ISimpleSliderModel,
  ISize,
  IThumbsPositions,
  IPosition,
  ISliderSettings,
} from '../interfaces';
import Subject from '../subject/subject';

class SimpleSliderModel extends Subject implements ISimpleSliderModel {
  private orientation = 'horizontal';
  private type: string;
  private min = 0;
  private max = 10;
  private step = 1;
  private thumbOneValue = 3;
  private thumbTwoValue = 7;
  private sliderSize = { width: 500, height: 10 };
  private thumbSize = { width: 500, height: 10 };

  /**
   * Полностью обновляет состояние модели
   * @param settings - объект с настройками модели
   */
  fullStateUpdate(settings: ISliderSettings): void {
    this.orientation = settings.orienation;
    this.type = settings.type;
    this.min = settings.min;
    this.max = settings.max;
    this.step = settings.step;
    this.sliderSize = settings.sliderSize;
    this.thumbSize = settings.thumbSize;

    const thumbOnePos = this.thumbValueToPos(settings.thumbOneValue);
    const thumbTwoPos = this.thumbValueToPos(settings.thumbTwoValue);
    this.updateThumbsState({ thumbOne: thumbOnePos, thumbTwo: thumbTwoPos });
  }

  getProgressBarSize(): void {
    const thumbOnePos = this.thumbValueToPos(this.thumbOneValue);
    const thumbTwoPos = this.thumbValueToPos(this.thumbTwoValue);
    let start = 0;
    let end = 0;

    if (this.type === 'single') {
      end =
        this.posByOrientation(thumbOnePos) +
        this.sizeByOrientation(this.thumbSize);
    } else {
      start = this.posByOrientation(thumbOnePos);
      end =
        this.posByOrientation(thumbOnePos) -
        this.posByOrientation(thumbTwoPos) +
        this.sizeByOrientation(this.thumbSize);
    }
  }

  // /**
  //  * Установка размера слайдера
  //  * @param {ISize} size - новый размер слайдера
  //  */
  // setSliderSize(size: ISize): void {
  //   this.sliderSize.width = size.width < 0 ? 0 : size.width;
  //   this.sliderSize.height = size.height < 0 ? 0 : size.height;
  // }

  // /**
  //  * Установка размера бегунка
  //  * @param {ISize} size - новый размер бегунка
  //  */
  // setThumbSize(size: ISize): void {
  //   this.thumbSize.width = size.width < 0 ? 0 : size.width;
  //   this.thumbSize.height = size.height < 0 ? 0 : size.height;
  // }

  /**
   * Возврат объекта с позициями бегунков
   * @returns {IThumbsPositions} - объект с позициями бегунков относительно левого и вернего края
   * родительского контейнера
   */
  getThumbsPos(): IThumbsPositions {
    return {
      thumbOne: this.thumbValueToPos(this.thumbOneValue),
      thumbTwo: this.thumbValueToPos(this.thumbTwoValue),
    };
  }

  /**
   * Обновление состояния бегунков и оповещение наблюдателей об изменении
   * @param {IThumbsPositions} positions - текущая позиция бегунков
   */
  updateThumbsState(positions: IThumbsPositions): void {
    const thumbOneValue = this.valueWithStep(
      this.posByOrientation(positions.thumbOne)
    );
    const thumbTwoValue = this.valueWithStep(
      this.posByOrientation(positions.thumbTwo)
    );

    if (thumbOneValue <= thumbTwoValue) {
      this.thumbOneValue = thumbOneValue;
      this.thumbTwoValue = thumbTwoValue;
    }

    this.notify('thumbsPosIsUpdated');
  }

  /**
   * Возвращение значение бегунка в соответствии с заданным шагом исходя из
   * его позиции
   * @param {number} position - позиция бегунка относительно левого или верхнего
   * края родительского контейнера
   * @returns {number} - значение бегунка в соответствии с заданным шагом
   */
  private valueWithStep(position: number): number {
    const stepsCount = (this.max - this.min) / this.step;
    const stepSize =
      (this.sizeByOrientation(this.sliderSize) -
        this.sizeByOrientation(this.thumbSize)) /
      stepsCount;
    const newPosition = Math.round(position / stepSize) * stepSize;

    return this.thumbPosToValue(newPosition);
  }

  /**
   * Возвращение значения бегунка исходя из его позиции
   * @param {number} position - позиция бегунка относительно левого или верхнего
   * края родительского контейнера
   * @returns {number} - значение бегунка
   */
  private thumbPosToValue(position: number): number {
    const pixelsPerValue = this.getPxPerValue();

    return Math.round(
      this.min +
        ((this.max - this.min) / 100) * Math.round(position / pixelsPerValue)
    );
  }

  /**
   * Возвращение позиции бегунка исходя из его значения
   * @param {number} value - значение бегунка
   * @returns {IThumbPosition} - объект с позицией бегунка относительно левого и вернего края
   * родительского контейнера
   */
  private thumbValueToPos(value: number): IPosition {
    const position = { left: 0, top: 0 };
    const pxPerVal = this.getPxPerValue();
    let thumbValue = value;

    if (thumbValue < this.min) {
      thumbValue = this.min;
    } else if (thumbValue > this.max) {
      thumbValue = this.max;
    }

    const posValue =
      this.min + ((this.max - this.min) / 100) * thumbValue * pxPerVal * 100;

    if (this.orientation === 'horizontal') {
      position.left = posValue;
    } else {
      position.top = posValue;
    }

    return position;
  }

  /**
   * Возвращает количество пикселей в единице ширины слайдера, с вычетом крайних зон
   * @returns {number} - количество пикселей в единице ширины слайдера
   */
  private getPxPerValue(): number {
    if (this.orientation === 'horizontal') {
      return (this.sliderSize.width - this.thumbSize.width) / 100;
    }

    return (this.sliderSize.height - this.thumbSize.height) / 100;
  }

  // /**
  //  * Возвращает размер одного шага бегунка в пикселях
  //  * @returns {number} - размер одного шага бегунка
  //  */
  // private getStepSize(): number {
  //   const stepsCount = (this.max - this.min) / this.step;

  //   return (
  //     (this.sizeByOrientation(this.sliderSize) -
  //       this.sizeByOrientation(this.thumbSize)) /
  //     stepsCount
  //   );
  // }

  /**
   * Возвращение ширины или высоты объекта, в зависимости от ориентации слайдера
   * @param {ISize} size - объект с шириной и высотой объекта
   * @returns {number} - значение ширины или высоты объекта
   */
  private sizeByOrientation(size: ISize): number {
    if (this.orientation === 'horizontal') {
      return size.width;
    }

    return size.height;
  }

  /**
   * Возвращение левого или верхнего отступа объекта, в зависимости от ориентации слайдера
   * @param {IPosition} position - объект с позицией
   * @returns {number} - значение левого или верхнего отступа объекта
   */
  private posByOrientation(position: IPosition): number {
    if (this.orientation === 'horizontal') {
      return position.left;
    }

    return position.top;
  }
}

export default SimpleSliderModel;
