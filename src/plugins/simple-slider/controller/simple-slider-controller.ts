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

  private subscribeToEvents(): void {
    this.viewSubject.register('thumbIsDragged', this);
    this.modelSubject.register('thumbsPositionsIsUpdated', this);
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
        this.model.updateThumbsState(this.view.getThumbsPositions());
        break;
      case 'thumbsPositionsIsUpdated':
        this.updateThumbsPositions();
        break;
      case 'minIsUpdated':
        this.updateView();
        this.model.recalculateStep();
        break;
      case 'maxIsUpdated':
        this.updateView();
        this.model.recalculateStep();
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
        this.updatePopUpsState();
        break;
      case 'clickToTrack':
        this.model.setThumbPositionOnClickPosition(
          this.view.getTrackClickPosition()
        );
        break;
      case 'clickToScale':
        this.model.setThumbPositionOnClickPosition(
          this.view.getScaleClickPosition()
        );
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
    this.model.updateThumbsState(this.model.getThumbsPositions());

    if (this.model.getScaleState()) {
      this.view.enableScale();

      const max = this.model.getMax();
      this.model.setScalePointSize(this.view.getScalePointSize(max));

      const points = this.model.getScalePoints();
      this.view.addScalePoints(points);
    } else {
      this.view.disableScale();
    }
  }

  private updateThumbsPositions(): void {
    this.view.updateThumbs(this.model.getThumbsPositions());
    this.view.updatePopUps(this.model.getPopUpsParams());
    this.view.updateProgressBar(this.model.getProgressBarParams());
  }

  private updateSliderOrientation(): void {
    if (this.model.getOrientation() === 'horizontal') {
      this.view.switchToHorizontal();
    } else {
      this.view.switchToVertical();
    }

    this.model.setSliderSize(this.view.getSliderSize());
    this.updateView();
  }

  private updateSliderType(): void {
    if (this.model.getType() === 'single') {
      this.view.switchToSingle();
    } else {
      this.view.switchToRange();
    }

    this.model.updateThumbsState(this.model.getThumbsPositions());
  }

  /**
   * Отображает/скрывает шкалу
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
   * Отображает/скрывает попапы
   */
  private updatePopUpsState(): void {
    if (this.model.getPopUpsState()) {
      this.view.enablePopUps();
      this.model.updateThumbsState(this.model.getThumbsPositions());
    } else {
      this.view.disablePopUps();
    }
  }
}

export default SimpleSliderController;
