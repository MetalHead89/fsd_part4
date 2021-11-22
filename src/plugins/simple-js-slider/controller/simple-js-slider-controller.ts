/* eslint-disable comma-dangle */

import {
  IControllerParams,
  // IObserver,
  // IPosition,
  ISimpleJsSliderModel,
  ISimpleJsSliderView,
  // ISubject,
  // ISubjectEvents,
  // IThumbsPositions,
} from '../interfaces';
import { IThumbsPositionsNew } from '../new-interfaces';

class SimpleJsSliderController {
  private model: ISimpleJsSliderModel;
  private view: ISimpleJsSliderView;
  // private modelSubject: ISubject;
  // private viewSubject: ISubject;
  // private events: ISubjectEvents = {
  //   thumbIsDragged: () => {
  //     this.model.updateThumbsState(this.view.getThumbsPositions());
  //   },
  //   thumbsPositionsIsUpdated: () => this.updateThumbsPositions(),
  //   minIsUpdated: () => {
  //     this.updateView();
  //     this.model.recalculateStep();
  //   },
  //   maxIsUpdated: () => {
  //     this.updateView();
  //     this.model.recalculateStep();
  //   },
  //   stepIsUpdated: () => this.updateView(),
  //   orientationIsUpdated: () => this.updateSliderOrientation(),
  //   typeIsUpdated: () => this.updateSliderType(),
  //   scaleStateIsUpdated: () => this.updateScaleState(),
  //   popUpsStateIsUpdated: () => this.updatePopUpsState(),
  //   clickToTrack: () => {
  //     this.model.setThumbPositionOnClickPosition(
  //       this.view.getTrackClickPosition()
  //     );
  //   },
  //   clickToScale: () => {
  //     this.model.setThumbPositionOnClickPosition(
  //       this.view.getScaleClickPosition()
  //     );
  //   },
  //   thumbsSwapped: () => this.view.swapThumbs(),
  //   windowResized: () => this.init(),
  // };

  constructor(params: IControllerParams) {
    this.model = params.model;
    this.view = params.view;
    // this.modelSubject = this.model.subject;
    // this.viewSubject = this.view.subject;

    this.init();
    // this.subscribeToEvents();
    this.bindContext();
    this.subscribeToEventsNew();
  }

  //NEW_METHODS//
  private subscribeToEventsNew(): void {
    this.view.observer.register(
      'thumbIsDragged',
      (args: IThumbsPositionsNew) => {
        this.model.updateThumbsValues(args);
      }
    );

    this.model.observer.register('modelIsUpdated', this.updateView);
    this.model.observer.register('settingsIsUpdated', this.fullViewUpdate);
  }

  private bindContext(): void {
    this.updateView = this.updateView.bind(this);
    this.fullViewUpdate = this.fullViewUpdate.bind(this);
  }

  private updateView(): void {
    this.view.moveThumbs(this.model.getThumbsPositionsNew());
    this.view.updatePopUps(this.model.getThumbValues());
    this.view.updateProgressBar();
  }

  private updateScale() {
    this.view.updateScale(this.model.getPointsParams());
  }
  //END_NEW_METHODS//

  // update(eventType: string): void {
  //   if (eventType in this.events) {
  //     this.events[eventType]();
  //   }
  // }

  private init(): void {
    this.fullViewUpdate();
    // this.model.setSliderSize(this.view.getSliderSize());
    // this.model.setThumbSize(this.view.getThumbSize());
    // this.updateSliderType();
    // this.updatePopUpsState();

    // this.updateView();
  }

  private fullViewUpdate(): void {
    this.updateSliderOrientation();
    this.updateView();
    this.updateScale();
  }

  // private subscribeToEvents(): void {
  //   this.viewSubject.register('thumbIsDragged', this);
  //   this.modelSubject.register('thumbsPositionsIsUpdated', this);
  //   this.modelSubject.register('minIsUpdated', this);
  //   this.modelSubject.register('maxIsUpdated', this);
  //   this.modelSubject.register('stepIsUpdated', this);
  //   this.modelSubject.register('typeIsUpdated', this);
  //   this.modelSubject.register('orientationIsUpdated', this);
  //   this.modelSubject.register('scaleStateIsUpdated', this);
  //   this.modelSubject.register('popUpsStateIsUpdated', this);
  //   this.modelSubject.register('thumbsSwapped', this);
  //   this.view.subject.register('clickToTrack', this);
  //   this.view.subject.register('clickToScale', this);
  //   this.view.subject.register('windowResized', this);
  // }

  // private updateView(): void {
  //   this.model.updateThumbsState(this.model.getThumbsPositions());

  //   if (this.model.isScaleEnabled()) {
  //     this.view.enableScale();

  //     const max = this.model.getMax();
  //     this.model.setScalePointSize(this.view.getScalePointSize(max));

  //     const points = this.model.getScalePoints();
  //     this.view.addScalePoints(points);
  //   } else {
  //     this.view.disableScale();
  //   }
  // }

  // private updateThumbsPositions(): void {
  //   this.view.updateThumbs(this.model.getThumbsPositions());
  //   this.view.updatePopUps(this.model.getPopUpsParams());
  //   this.view.updateProgressBar(this.model.getProgressBarParams());
  // }

  private updateSliderOrientation(): void {
    if (this.model.getOrientation() === 'horizontal') {
      this.view.switchToHorizontal();
    } else {
      this.view.switchToVertical();
    }

    this.model.setSliderSize(this.view.getSliderSize());
    // this.updateView();
  }

  // private updateSliderType(): void {
  //   if (this.model.getType() === 'single') {
  //     this.view.switchToSingle();
  //   } else {
  //     this.view.switchToRange();
  //   }

  //   this.model.updateThumbsState(this.model.getThumbsPositions());
  // }

  // private updateScaleState() {
  //   if (this.model.isScaleEnabled()) {
  //     this.view.enableScale();
  //     this.updateView();
  //   } else {
  //     this.view.disableScale();
  //   }
  // }

  // private updatePopUpsState(): void {
  //   if (this.model.isPopUpsEnabled()) {
  //     this.view.enablePopUps();
  //     this.model.updateThumbsState(this.model.getThumbsPositions());
  //   } else {
  //     this.view.disablePopUps();
  //   }
  // }
}

export default SimpleJsSliderController;

// /* eslint-disable comma-dangle */

// import {
//   IControllerParams,
//   IObserver,
//   IPosition,
//   ISimpleJsSliderModel,
//   ISimpleJsSliderView,
//   ISubject,
//   ISubjectEvents,
//   IThumbsPositions,
// } from '../interfaces';
// import { IThumbsPositionsNew } from '../new-interfaces';

// class SimpleJsSliderController implements IObserver {
//   private model: ISimpleJsSliderModel;
//   private view: ISimpleJsSliderView;
//   private modelSubject: ISubject;
//   private viewSubject: ISubject;
//   private events: ISubjectEvents = {
//     thumbIsDragged: () => {
//       this.model.updateThumbsState(this.view.getThumbsPositions());
//     },
//     thumbsPositionsIsUpdated: () => this.updateThumbsPositions(),
//     minIsUpdated: () => {
//       this.updateView();
//       this.model.recalculateStep();
//     },
//     maxIsUpdated: () => {
//       this.updateView();
//       this.model.recalculateStep();
//     },
//     stepIsUpdated: () => this.updateView(),
//     orientationIsUpdated: () => this.updateSliderOrientation(),
//     typeIsUpdated: () => this.updateSliderType(),
//     scaleStateIsUpdated: () => this.updateScaleState(),
//     popUpsStateIsUpdated: () => this.updatePopUpsState(),
//     clickToTrack: () => {
//       this.model.setThumbPositionOnClickPosition(
//         this.view.getTrackClickPosition()
//       );
//     },
//     clickToScale: () => {
//       this.model.setThumbPositionOnClickPosition(
//         this.view.getScaleClickPosition()
//       );
//     },
//     thumbsSwapped: () => this.view.swapThumbs(),
//     windowResized: () => this.init(),
//   };

//   constructor(params: IControllerParams) {
//     this.model = params.model;
//     this.view = params.view;
//     this.modelSubject = this.model.subject;
//     this.viewSubject = this.view.subject;

//     this.subscribeToEvents();
//     this.init();
//     this.subscribeToEventsNew();
//   }

//   //NEW_METHODS//
//   private subscribeToEventsNew(): void {
//     this.view.observer.register('thumbIsDragged', (args: IThumbsPositionsNew) => {
//       this.model.updateThumbsValues(args);
//     });

//     this.model.observer.register('thumbIsUpdated', (args: IThumbsPositionsNew) => {
//       this.view.moveThumbs(args);
//     });
//   }
//   //END_NEW_METHODS//

//   update(eventType: string): void {
//     if (eventType in this.events) {
//       this.events[eventType]();
//     }
//   }

//   private init(): void {
//     this.updateSliderOrientation();
//     this.model.setSliderSize(this.view.getSliderSize());
//     this.model.setThumbSize(this.view.getThumbSize());
//     this.updateSliderType();
//     this.updatePopUpsState();

//     this.updateView();
//   }

//   private subscribeToEvents(): void {
//     this.viewSubject.register('thumbIsDragged', this);
//     this.modelSubject.register('thumbsPositionsIsUpdated', this);
//     this.modelSubject.register('minIsUpdated', this);
//     this.modelSubject.register('maxIsUpdated', this);
//     this.modelSubject.register('stepIsUpdated', this);
//     this.modelSubject.register('typeIsUpdated', this);
//     this.modelSubject.register('orientationIsUpdated', this);
//     this.modelSubject.register('scaleStateIsUpdated', this);
//     this.modelSubject.register('popUpsStateIsUpdated', this);
//     this.modelSubject.register('thumbsSwapped', this);
//     this.view.subject.register('clickToTrack', this);
//     this.view.subject.register('clickToScale', this);
//     this.view.subject.register('windowResized', this);
//   }

//   private updateView(): void {
//     this.model.updateThumbsState(this.model.getThumbsPositions());

//     if (this.model.isScaleEnabled()) {
//       this.view.enableScale();

//       const max = this.model.getMax();
//       this.model.setScalePointSize(this.view.getScalePointSize(max));

//       const points = this.model.getScalePoints();
//       this.view.addScalePoints(points);
//     } else {
//       this.view.disableScale();
//     }
//   }

//   private updateThumbsPositions(): void {
//     this.view.updateThumbs(this.model.getThumbsPositions());
//     this.view.updatePopUps(this.model.getPopUpsParams());
//     this.view.updateProgressBar(this.model.getProgressBarParams());
//   }

//   private updateSliderOrientation(): void {
//     if (this.model.getOrientation() === 'horizontal') {
//       this.view.switchToHorizontal();
//     } else {
//       this.view.switchToVertical();
//     }

//     this.model.setSliderSize(this.view.getSliderSize());
//     this.updateView();
//   }

//   private updateSliderType(): void {
//     if (this.model.getType() === 'single') {
//       this.view.switchToSingle();
//     } else {
//       this.view.switchToRange();
//     }

//     this.model.updateThumbsState(this.model.getThumbsPositions());
//   }

//   private updateScaleState() {
//     if (this.model.isScaleEnabled()) {
//       this.view.enableScale();
//       this.updateView();
//     } else {
//       this.view.disableScale();
//     }
//   }

//   private updatePopUpsState(): void {
//     if (this.model.isPopUpsEnabled()) {
//       this.view.enablePopUps();
//       this.model.updateThumbsState(this.model.getThumbsPositions());
//     } else {
//       this.view.disablePopUps();
//     }
//   }
// }

// export default SimpleJsSliderController;
