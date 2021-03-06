/* eslint-disable comma-dangle */

import { event } from 'jquery';
import {
  IControllerParams,
  IObserver,
  ISimpleSliderModel,
  ISimpleSliderView,
  ISubject,
} from '../interfaces';

class SimpleSliderController implements IObserver {
  private model: ISimpleSliderModel;
  private view: ISimpleSliderView;
  private modelSubject: ISubject;
  private viewSubject: ISubject;

  constructor(params: IControllerParams) {
    this.model = params.model;
    this.view = params.view;
    this.modelSubject = this.model.subject;
    this.viewSubject = this.view.subject;

    this.subscribeToEvents();
    this.init();
  }

  /**
   * Инициализация слайдера в соответстви с первичными настройками
   */
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

  /**
   * Подписывает Controller на необходимые события, возникающие во View и Model
   */
  private subscribeToEvents(): void {
    this.viewSubject.register('thumbIsDragged', this);
    this.modelSubject.register('thumbsPosIsUpdated', this);
    this.modelSubject.register('minIsUpdated', this);
    this.modelSubject.register('maxIsUpdated', this);
    this.modelSubject.register('stepIsUpdated', this);
    this.modelSubject.register('typeIsUpdated', this);
    this.modelSubject.register('orientationIsUpdated', this);
    this.modelSubject.register('scaleStateIsUpdated', this);
    this.modelSubject.register('popUpsStateIsUpdated', this);
  }

  /**
   * Перехватывание и реагирование на события, возникающие в Model и View
   * @param {string} eventType - тип уведомления
   */
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
    if (eventType === 'maxIsUpdated') {
      this.updateView();
    }
    if (eventType === 'stepIsUpdated') {
      this.updateView();
    }
    if (eventType === 'orientationIsUpdated') {
      if (this.model.getOrientation() === 'horizontal') {
        this.view.switchToHorizontal();
      } else {
        this.view.switchToVertical();
      }

      this.model.setSliderSize(this.view.getSliderSize());
      this.updateView();
    }
    if (eventType === 'typeIsUpdated') {
      if (this.model.getType() === 'single') {
        this.view.switchToSingle();
      } else {
        this.view.switchToRange();
      }

      this.model.updateThumbsState(this.model.getThumbsPos());
    }
    if (eventType === 'scaleStateIsUpdated') {
      if (this.model.getScaleState()) {
        this.view.enableScale();
        this.updateView();
      } else {
        this.view.disableScale();
      }
    }
    if (eventType === 'popUpsStateIsUpdated') {
      if (this.model.getPopUpsState()) {
        this.view.enablePopUps();
        this.model.updateThumbsState(this.model.getThumbsPos());
      } else {
        this.view.disablePopUps();
      }
    }
  }

  /**
   * Обновляет бегунки, прогрессбар и шкалу во View в соответствии с их состоянием
   */
  private updateView(): void {
    this.model.updateThumbsState(this.model.getThumbsPos());

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
