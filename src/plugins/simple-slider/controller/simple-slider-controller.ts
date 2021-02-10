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
  }

  update(eventType: string): void {
    if (eventType === 'thumbIsDragged') {
      this.simpleSliderModel.updateThumbsState(
        this.simpleSliderView.getThumbsPos(),
      );
    } else if (eventType === 'thumbsPosIsUpdated') {
      this.simpleSliderView.updateThumbs(this.simpleSliderModel.getThumbsPos());
      this.simpleSliderView.updateProgressBar(
        this.simpleSliderModel.getProgressBarParams(),
      );
    }
  }
}

export default SimpleSliderController;
