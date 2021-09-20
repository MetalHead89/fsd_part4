/* eslint-disable comma-dangle */

import {
  IControllerParams,
  IObserver,
  ISimpleSliderModel,
  ISimpleSliderView,
  ISubject,
  ISubjectEvents,
} from '../interfaces';

class SimpleSliderController implements IObserver {
  private model: ISimpleSliderModel;
  private view: ISimpleSliderView;
  private modelSubject: ISubject;
  private viewSubject: ISubject;

  private events: ISubjectEvents = {
    thumbIsDragged: () => {
      this.model.updateThumbsState(this.view.getThumbsPositions());
    },
    thumbsPositionsIsUpdated: () => this.updateThumbsPositions(),
    minIsUpdated: () => {
      this.updateView();
      this.model.recalculateStep();
    },
    maxIsUpdated: () => {
      this.updateView();
      this.model.recalculateStep();
    },
    stepIsUpdated: () => this.updateView(),
    orientationIsUpdated: () => this.updateSliderOrientation(),
    typeIsUpdated: () => this.updateSliderType(),
    scaleStateIsUpdated: () => this.updateScaleState(),
    popUpsStateIsUpdated: () => this.updatePopUpsState(),
    clickToTrack: () => {
      this.model.setThumbPositionOnClickPosition(
        this.view.getTrackClickPosition()
      );
    },
    clickToScale: () => {
      this.model.setThumbPositionOnClickPosition(
        this.view.getScaleClickPosition()
      );
    },
    windowResized: () => this.init(),
  };

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

  update(eventType: string): void {
    this.events[eventType]();
  }

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

  private updateScaleState() {
    if (this.model.getScaleState()) {
      this.view.enableScale();
      this.updateView();
    } else {
      this.view.disableScale();
    }
  }

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
