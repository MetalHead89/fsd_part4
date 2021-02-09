/* eslint-disable comma-dangle */

import {
  IControllerParams,
  IObserver,
  ISimpleSliderModel,
  ISimpleSliderView,
  ISliderSettings,
} from '../interfaces';

class SimpleSliderController implements IObserver {
  private simpleSliderModel: ISimpleSliderModel;
  private simpleSliderView: ISimpleSliderView;

  constructor(params: IControllerParams) {
    this.simpleSliderModel = params.model;
    this.simpleSliderView = params.view;
    this.simpleSliderModel.register('thumbsPosIsUpdated', this);
    this.simpleSliderView.register('thumbIsDragged', this);

    this.init(params.settings);
  }

  private init(settings: ISliderSettings): void {
    const sliderSize = this.simpleSliderView.getSliderSize();
    const thumbSize = this.simpleSliderView.getThumbSize();

    settings.sliderSize = sliderSize;
    settings.thumbSize = thumbSize;
    this.simpleSliderModel.fullStateUpdate(settings);

    // this.simpleSliderView.updatedThumbs(this.simpleSliderModel.getThumbsPos());
    // this.simpleSliderModel.setSliderSize(this.simpleSliderView.getSliderSize());
    // this.simpleSliderModel.setThumbSize(this.simpleSliderView.getThumbSize());
    // this.simpleSliderView.updatedThumbs(
    //   this.simpleSliderModel.getThumbsPos()
    // );
  }

  update(eventType: string): void {
    if (eventType === 'thumbIsDragged') {
      this.simpleSliderModel.updateThumbsState(
        this.simpleSliderView.getThumbsPos(),
      );
    } else if (eventType === 'thumbsPosIsUpdated') {
      this.simpleSliderView.updatedThumbs(
        this.simpleSliderModel.getThumbsPos(),
      );
    }
  }

  /**
   * Установка размера слайдера
   * @param {ISize} size - новый размер слайдера
   */
  // setSliderSize(size: ISize): void {
  //   this.simpleSliderModel.setSliderSize(size);
  // }

  // /**
  //  * Установка размера бегунка
  //  * @param {ISize} size - новый размер бегунка
  //  */
  // setThumbSize(size: ISize): void {
  //   this.simpleSliderModel.setThumbSize(size);
  // }
}

export default SimpleSliderController;
