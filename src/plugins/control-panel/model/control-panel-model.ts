import {
  IObserver,
  ISliderSettings,
  ISubject,
  IThumbsValues,
} from '../../simple-js-slider/interfaces';
import { IObserverNew } from '../../simple-js-slider/new-interfaces';
import ObserverNew from '../../simple-js-slider/observer/observer';
import Subject from '../../simple-js-slider/subject/subject';
import { ISubjectEvents } from '../interfaces';

class ControlPanelModel {
  observer: IObserverNew;
  private slider: JQuery<HTMLElement>;
  private sliderObserver: IObserverNew;
  // private subject: ISubject;
  // private events: ISubjectEvents = {
  //   thumbsPositionsIsUpdated: () => this.notify('thumbsPositionsIsUpdated'),
  //   minIsUpdated: () => this.notify('minIsUpdated'),
  //   maxIsUpdated: () => this.notify('maxIsUpdated'),
  //   stepIsUpdated: () => this.notify('stepIsUpdated'),
  // };

  constructor(slider: JQuery<HTMLElement>) {
    this.observer = new ObserverNew();
    this.slider = slider;
    this.sliderObserver = this.slider.simpleJsSlider('getObserver');
    this.subscribeToEvents();
    // this.subject = slider.simpleJsSlider('getModelSubject');
    // this.subject.register('thumbsPositionsIsUpdated', this);
    // this.subject.register('minIsUpdated', this);
    // this.subject.register('maxIsUpdated', this);
    // this.subject.register('stepIsUpdated', this);
  }

  private subscribeToEvents() {
    this.sliderObserver.register('settingsIsUpdated', () => {
      this.observer.notify('sliderIsUpdated');
    });
    this.sliderObserver.register('modelIsUpdated', () => {
      this.observer.notify('sliderIsUpdated');
    });
  }

  // update(eventType: string): void {
  //   if (eventType in this.events) {
  //     this.events[eventType]();
  //   }
  // }

  getSliderSettings(): ISliderSettings {
    return this.slider.simpleJsSlider('getSliderSettings');
  }

  // getThumbsValues(): IThumbsValues {
  //   return this.slider.simpleJsSlider('getThumbsValues');
  // }

  // getMin(): number {
  //   return this.slider.simpleJsSlider('getMin');
  // }

  // getMax(): number {
  //   return this.slider.simpleJsSlider('getMax');
  // }

  // getStep(): number {
  //   return this.slider.simpleJsSlider('getStep');
  // }

  // isScaleEnabled(): boolean {
  //   return this.slider.simpleJsSlider('isScaleEnabled');
  // }

  // isPopUpsEnabled(): boolean {
  //   return this.slider.simpleJsSlider('isPopUpsEnabled');
  // }

  // getType(): string {
  //   return this.slider.simpleJsSlider('getType');
  // }

  // getOrientation(): string {
  //   return this.slider.simpleJsSlider('getOrientation');
  // }

  updateSliderPluginSettings(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('updateSliderSettings', sliderSettings);
  }
}

export default ControlPanelModel;
