import { ISliderSettings } from '../../simple-js-slider/interfaces';
// import { ISubjectEvents } from '../interfaces';
import ControlPanelModel from '../model/control-panel-model';
import ControlPanelView from '../view/control-panel-view';

class ControlPanelController {
  private view: ControlPanelView;
  private model: ControlPanelModel;
  // private events: ISubjectEvents = {
  //   thumbsPositionsIsUpdated: () => {
  //     this.view.setThumbsValues(this.model.getThumbsValues());
  //   },
  //   minIsUpdated: () => this.view.setMinValue(this.model.getMin()),
  //   maxIsUpdated: () => this.view.setMaxValue(this.model.getMax()),
  //   stepIsUpdated: () => this.view.setStep(this.model.getStep()),
  //   controlPanelDataUpdated: () => {
  //     this.model.refreshSliderState(this.getSliderSettings());
  //   },
  // };

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;
    this.init();

    // this.subscribeToEvents();
  }

  init(): void {
    const sliderSettings: ISliderSettings = this.model.getSliderSettings();
    this.view.setThumbsValues({
      thumbOne: sliderSettings.thumbOneValue,
      thumbTwo: sliderSettings.thumbTwoValue,
    });
    this.view.setMinValue(sliderSettings.min);
    this.view.setMaxValue(sliderSettings.max);
    this.view.setStep(sliderSettings.step);
    this.view.setScaleState(sliderSettings.isScale);
    this.view.setPopUpsState(sliderSettings.isPopUps);
    this.view.setTypeRadio(sliderSettings.type);
    this.view.setOrientationRadio(sliderSettings.orientation);
    // this.view.setThumbsValues(this.model.getThumbsValues());
    // this.view.setMinValue(this.model.getMin());
    // this.view.setMaxValue(this.model.getMax());
    // this.view.setStep(this.model.getStep());
    // this.view.setScaleState(this.model.isScaleEnabled());
    // this.view.setPopUpsState(this.model.isPopUpsEnabled());
    // this.view.setTypeRadio(this.model.getType());
    // this.view.setOrientationRadio(this.model.getOrientation());
  }

  // update(eventType: string): void {
  //   if (eventType in this.events) {
  //     this.events[eventType]();
  //   }
  // }

  // private subscribeToEvents(): void {
  //   this.model.register('thumbsPositionsIsUpdated', this);
  //   this.model.register('minIsUpdated', this);
  //   this.model.register('maxIsUpdated', this);
  //   this.model.register('stepIsUpdated', this);
  //   this.view.register('controlPanelDataUpdated', this);
  // }

  private getSliderSettings(): ISliderSettings {
    return {
      orientation: this.view.getOrientation(),
      type: this.view.getType(),
      isScale: this.view.isScaleEnabled(),
      isPopUps: this.view.isPopUpsEnabled(),
      min: this.view.getMin(),
      max: this.view.getMax(),
      step: this.view.getStep(),
      thumbOneValue: this.view.getThumbOneValue(),
      thumbTwoValue: this.view.getThumbTwoValue(),
    };
  }

  // private subscribeToEvents(): void {
  //   this.model.register('thumbsPositionsIsUpdated', this);
  //   this.model.register('minIsUpdated', this);
  //   this.model.register('maxIsUpdated', this);
  //   this.model.register('stepIsUpdated', this);
  //   this.view.register('controlPanelDataUpdated', this);
  // }
}

export default ControlPanelController;

// import { IObserver, ISliderSettings } from '../../simple-js-slider/interfaces';
// import { ISubjectEvents } from '../interfaces';
// import ControlPanelModel from '../model/control-panel-model';
// import ControlPanelView from '../view/control-panel-view';

// class ControlPanelController implements IObserver {
//   private view: ControlPanelView;
//   private model: ControlPanelModel;
//   private events: ISubjectEvents = {
//     thumbsPositionsIsUpdated: () => {
//       this.view.setThumbsValues(this.model.getThumbsValues());
//     },
//     minIsUpdated: () => this.view.setMinValue(this.model.getMin()),
//     maxIsUpdated: () => this.view.setMaxValue(this.model.getMax()),
//     stepIsUpdated: () => this.view.setStep(this.model.getStep()),
//     controlPanelDataUpdated: () => {
//       this.model.refreshSliderState(this.getSliderSettings());
//     },
//   };

//   constructor(view: ControlPanelView, model: ControlPanelModel) {
//     this.view = view;
//     this.model = model;
//     this.init();

//     this.subscribeToEvents();
//   }

//   init(): void {
//     this.view.setThumbsValues(this.model.getThumbsValues());
//     this.view.setMinValue(this.model.getMin());
//     this.view.setMaxValue(this.model.getMax());
//     this.view.setStep(this.model.getStep());
//     this.view.setScaleState(this.model.isScaleEnabled());
//     this.view.setPopUpsState(this.model.isPopUpsEnabled());
//     this.view.setTypeRadio(this.model.getType());
//     this.view.setOrientationRadio(this.model.getOrientation());
//   }

//   update(eventType: string): void {
//     if (eventType in this.events) {
//       this.events[eventType]();
//     }
//   }

//   private getSliderSettings(): ISliderSettings {
//     return {
//       orientation: this.view.getOrientation(),
//       type: this.view.getType(),
//       isScale: this.view.isScaleEnabled(),
//       isPopUps: this.view.isPopUpsEnabled(),
//       min: this.view.getMin(),
//       max: this.view.getMax(),
//       step: this.view.getStep(),
//       thumbOneValue: this.view.getThumbOneValue(),
//       thumbTwoValue: this.view.getThumbTwoValue(),
//     };
//   }

//   private subscribeToEvents(): void {
//     this.model.register('thumbsPositionsIsUpdated', this);
//     this.model.register('minIsUpdated', this);
//     this.model.register('maxIsUpdated', this);
//     this.model.register('stepIsUpdated', this);
//     this.view.register('controlPanelDataUpdated', this);
//   }
// }

// export default ControlPanelController;
