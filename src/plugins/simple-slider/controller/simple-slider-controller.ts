/* eslint-disable comma-dangle */

import {
  IControllerParams,
  IObserver,
  ISimpleSliderModel,
  ISimpleSliderView,
  ISliderSettings,
} from '../interfaces';

class SimpleSliderController implements IObserver {
  private model: ISimpleSliderModel;
  private view: ISimpleSliderView;

  constructor(params: IControllerParams) {
    this.model = params.model;
    this.view = params.view;

    this.subscribeToEvents();
    this.init();
    // this.simpleSliderModel.register('thumbsPosIsUpdated', this);
    // this.simpleSliderView.register('thumbIsDragged', this);
    // this.simpleSliderModel.register('scaleOn', this);

    // this.init(params.settings);
  }

  private init(): void {
    this.model.setSliderSize(this.view.getSliderSize());
    this.model.setThumbSize(this.view.getThumbSize());

    if (this.model.getOrientation() === 'horizontal') {
      this.view.switchToHorizontal();
    } else {
      this.view.switchToVertical();
    }

    if (this.model.getType() === 'single') {
      this.view.switchToSingle();
    } else {
      this.view.switchToRange();
    }
  }

  private subscribeToEvents(): void {}

  // /**
  //  * Инициализация слайдера в оответствии с полученными настройками
  //  * @param {ISliderSettings} sliderSettings - объект с настройками слайдера
  //  */
  // private init(sliderSettings: ISliderSettings): void {
  // const settings = { ...sliderSettings };
  // const sliderSize = this.simpleSliderView.getSliderSize();
  // const thumbSize = this.simpleSliderView.getThumbSize();

  // settings.sliderSize = sliderSize;
  // settings.thumbSize = thumbSize;
  // this.simpleSliderModel.refreshSliderState(settings);
  // }

  // /**
  //  * Перехватывание и реагирование на уведомления от SimpleSliderModel и SimpleSliderView
  //  * @param {string} eventType - тип уведомления
  //  */
  update(eventType: string): void {
    //   if (eventType === 'thumbIsDragged') {
    //     this.simpleSliderModel.updateThumbsState(
    //       this.simpleSliderView.getThumbsPos(),
    //     );
    //   }
    //   if (eventType === 'thumbsPosIsUpdated') {
    //     this.simpleSliderView.updateThumbs(this.simpleSliderModel.getThumbsPos());
    //     this.simpleSliderView.updatePopUps(
    //       this.simpleSliderModel.getPopUpsParams(),
    //     );
    //     this.simpleSliderView.updateProgressBar(
    //       this.simpleSliderModel.getProgressBarParams(),
    //     );
    //   }
    //   if (eventType === 'scaleOn') {
    //     const max = this.simpleSliderModel.getMax();
    //     const points = this.simpleSliderModel.getScalePoints(
    //       this.simpleSliderView.getScalePointSize(max),
    //     );
    //     this.simpleSliderView.addScalePoints(points);
    // }
  }
}

export default SimpleSliderController;
