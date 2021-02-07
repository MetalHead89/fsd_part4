/* eslint-disable comma-dangle */

import {
  IObserver,
  ISimpleSliderModel,
  ISimpleSliderView,
  ISize,
} from '../interfaces';

class SimpleSliderController implements IObserver {
  private simpleSliderModel: ISimpleSliderModel;
  private simpleSliderView: ISimpleSliderView;

  constructor(model: ISimpleSliderModel, view: ISimpleSliderView) {
    this.simpleSliderModel = model;
    this.simpleSliderView = view;
    this.simpleSliderModel.register('thumbsPosIsUpdated', this);
    this.simpleSliderView.register('thumbIsDragged', this);

    this.init();
  }

  private init(): void {
    this.simpleSliderModel.setSliderSize(this.simpleSliderView.getSliderSize());
    this.simpleSliderModel.setThumbSize(this.simpleSliderView.getThumbSize());
    this.simpleSliderView.updatedThumbs(
      this.simpleSliderModel.getThumbsPos()
    );
  }

  update(eventType: string): void {
    if (eventType === 'thumbIsDragged') {
      this.simpleSliderModel.updatedThumbsValues(
        this.simpleSliderView.getThumbsPos()
      );
    } else if (eventType === 'thumbsPosIsUpdated') {
      this.simpleSliderView.updatedThumbs(
        this.simpleSliderModel.getThumbsPos()
      );
    }
  }

  /**
   * Установка размера слайдера
   * @param {ISize} size - новый размер слайдера
   */
  setSliderSize(size: ISize): void {
    this.simpleSliderModel.setSliderSize(size);
  }

  /**
   * Установка размера бегунка
   * @param {ISize} size - новый размер бегунка
   */
  setThumbSize(size: ISize): void {
    this.simpleSliderModel.setThumbSize(size);
  }
}

export default SimpleSliderController;
