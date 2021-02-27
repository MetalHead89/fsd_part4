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

    if (this.model.getPopUpsState()) {
      this.view.enablePopUps();
    } else {
      this.view.disablePopUps();
    }

    this.updateView();
  }

  private subscribeToEvents(): void {
    this.view.register('thumbIsDragged', this);
    this.model.register('thumbsPosIsUpdated', this);
    this.model.register('minIsUpdated', this);
  }

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
    if (eventType === 'thumbIsDragged') {
      this.model.updateThumbsState(this.view.getThumbsPos());
    }
    if (eventType === 'thumbsPosIsUpdated') {
      this.view.updateThumbs(this.model.getThumbsPos());
      this.view.updatePopUps(this.model.getPopUpsParams());
      this.view.updateProgressBar(this.model.getProgressBarParams());
    }
    if (eventType === 'minIsUpdated') {
      this.updateView();
    }
    //   if (eventType === 'scaleOn') {
    // const max = this.simpleSliderModel.getMax();
    // const points = this.simpleSliderModel.getScalePoints(
    //   this.simpleSliderView.getScalePointSize(max),
    // );
    //     this.simpleSliderView.addScalePoints(points);
    // }
  }

  private updateView(): void {
    this.view.updateThumbs(this.model.getThumbsPos());
    this.view.updatePopUps(this.model.getPopUpsParams());
    this.view.updateProgressBar(this.model.getProgressBarParams());

    if (this.model.getScaleState()) {
      this.view.enableScale();
      const max = this.model.getMax();
      const points = this.model.getScalePoints(
        this.view.getScalePointSize(max)
      );
      this.view.addScalePoints(points);
    } else {
      this.view.disableScale();
    }
  }
}

export default SimpleSliderController;
