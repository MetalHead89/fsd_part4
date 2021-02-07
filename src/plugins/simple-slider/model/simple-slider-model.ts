/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

import {
  ISimpleSliderModel,
  ISize,
  IThumbsPositions,
  IPosition,
} from '../interfaces';
import Subject from '../subject/subject';

class SimpleSliderModel extends Subject implements ISimpleSliderModel {
  private orientation = 'horizontal';
  private min = 0;
  private max = 10;
  private thumbOneValue = 3;
  private thumbTwoValue = 7;
  private sliderSize = { width: 0, height: 0 };
  private thumbSize = { width: 0, height: 0 };

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

  setThumbs(positions: IThumbsPositions): void {
    this.thumbOneValue = this.thumbPosToValue(positions.thumbOne.left);
    this.thumbTwoValue = this.thumbPosToValue(positions.thumbTwo.left);
    this.notify('thumbsPosIsUpdated');
  }

  /**
   * Возвращает значение бегунка исходя из его позиции
   * @returns {number} - значение позиции, на которой находится бегунок
   */
  private thumbPosToValue(position: number): number {
    const pixelsPerValue = this.getPxPerValue();

    return Math.round(
      this.min +
        ((this.max - this.min) / 100) * Math.round(position / pixelsPerValue)
    );
  }

  /**
   * Возвращает объект с позициями бегунков
   * @returns {IThumbsPositions} - объект с позициями бегунков относительно левого и вернего края
   * родительского контейнера
   */
  getThumbsPositions(): IThumbsPositions {
    return {
      thumbOne: this.thumbValueToPos(this.thumbOneValue),
      thumbTwo: this.thumbValueToPos(this.thumbTwoValue),
    };
  }

  /**
   * Возвращает позицию бегунка исходя из его значения
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
   * Возвращает количество пикселей в единице ширины слайдера, с вычетом крайних
   * (тупиковых) зон
   * @returns {number} - количество пикселей в единице ширины слайдера
   */
  private getPxPerValue(): number {
    if (this.orientation === 'horizontal') {
      return (this.sliderSize.width - this.thumbSize.width) / 100;
    }

    return (this.sliderSize.height - this.thumbSize.height) / 100;
  }
}

export default SimpleSliderModel;
