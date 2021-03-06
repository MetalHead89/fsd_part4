/* eslint-disable comma-dangle */

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
   * Инициализация слайдера в соответствии с первичными настройками
   */
  private init(): void {
    if (this.model.getOrientation() === 'horizontal') {
      this.view.switchToHorizontal();
    } else {
      this.view.switchToVertical();
    }

    this.model.setSliderSize(this.view.getSliderSize());
    this.model.setThumbSize(this.view.getThumbSize());

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
    this.view.subject.register('clickToTrack', this);
    this.view.subject.register('clickToScale', this);
    this.view.subject.register('windowResized', this);
  }

  /**
   * Перехватывание и реагирование на события, возникающие в Model и View
   * @param {string} eventType - тип уведомления
   */
  update(eventType: string): void {
    switch (eventType) {
      case 'thumbIsDragged':
        this.model.updateThumbsState(this.view.getThumbsPos());
        break;
      case 'thumbsPosIsUpdated':
        this.updateThumbsPos();
        break;
      case 'minIsUpdated':
        this.updateView();
        break;
      case 'maxIsUpdated':
        this.updateView();
        break;
      case 'stepIsUpdated':
        this.updateView();
        break;
      case 'orientationIsUpdated':
        this.updateSliderOrientation();
        break;
      case 'typeIsUpdated':
        this.updateSliderType();
        break;
      case 'scaleStateIsUpdated':
        this.updateScaleState();
        break;
      case 'popUpsStateIsUpdated':
        this.updatePopUpsSate();
        break;
      case 'clickToTrack':
        this.model.setThumbPosOnClickPos(this.view.getTrackClickPosition());
        break;
      case 'clickToScale':
        this.model.setThumbPosOnClickPos(this.view.getScaleClickPosition());
        break;
      case 'windowResized':
        this.init();
        break;
      default:
        break;
    }
  }

  /**
   * Обновляет бегунки, прогресс-бар и шкалу во View в соответствии с их состоянием
   */
  private updateView(): void {
    this.model.updateThumbsState(this.model.getThumbsPos());

    if (this.model.getScaleState()) {
      this.view.enableScale();
      const max = this.model.getMax();
      const points = this.model.getScalePoints(
        this.view.getScalePointSize(max),
      );
      this.view.addScalePoints(points);
    } else {
      this.view.disableScale();
    }
  }

  /**
   * Обновляет позиции бегунков во view
   */
  private updateThumbsPos(): void {
    this.view.updateThumbs(this.model.getThumbsPos());
    this.view.updatePopUps(this.model.getPopUpsParams());
    this.view.updateProgressBar(this.model.getProgressBarParams());
  }

  /**
   * Обновляет ориентацию слайдера и его элементов во view
   */
  private updateSliderOrientation(): void {
    if (this.model.getOrientation() === 'horizontal') {
      this.view.switchToHorizontal();
    } else {
      this.view.switchToVertical();
    }

    this.model.setSliderSize(this.view.getSliderSize());
    this.updateView();
  }

  /**
   * Обновляет слайдер во view в соответствии с типом
   */
  private updateSliderType(): void {
    if (this.model.getType() === 'single') {
      this.view.switchToSingle();
    } else {
      this.view.switchToRange();
    }

    this.model.updateThumbsState(this.model.getThumbsPos());
  }

  /**
   * Обновляет отображение шкалы слайдера во view
   */
  private updateScaleState() {
    if (this.model.getScaleState()) {
      this.view.enableScale();
      this.updateView();
    } else {
      this.view.disableScale();
    }
  }

  /**
   * Обновляет отображение всплывающих подсказок во view
   */
  private updatePopUpsSate(): void {
    if (this.model.getPopUpsState()) {
      this.view.enablePopUps();
      this.model.updateThumbsState(this.model.getThumbsPos());
    } else {
      this.view.disablePopUps();
    }
  }
}

export default SimpleSliderController;
