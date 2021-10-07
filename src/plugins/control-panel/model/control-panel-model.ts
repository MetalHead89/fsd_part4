import {
  IObserver,
  ISliderSettings,
  ISubject,
  IThumbsValues,
} from '../../simple-js-slider/interfaces';
import Subject from '../../simple-js-slider/subject/subject';
import { ISubjectEvents } from '../interfaces';

class ControlPanelModel extends Subject implements IObserver {
  private slider: JQuery<HTMLElement>;
  private subject: ISubject;
  private events: ISubjectEvents = {
    thumbsPositionsIsUpdated: () => this.notify('thumbsPositionsIsUpdated'),
    minIsUpdated: () => this.notify('minIsUpdated'),
    maxIsUpdated: () => this.notify('maxIsUpdated'),
    stepIsUpdated: () => this.notify('stepIsUpdated'),
  };

  constructor(slider: JQuery<HTMLElement>) {
    super();
    this.slider = slider;
    this.subject = slider.simpleJsSlider('getModelSubject');
    this.subject.register('thumbsPositionsIsUpdated', this);
    this.subject.register('minIsUpdated', this);
    this.subject.register('maxIsUpdated', this);
    this.subject.register('stepIsUpdated', this);
  }

  update(eventType: string): void {
    if (eventType in this.events) {
      this.events[eventType]();
    }
  }

  getThumbsValues(): IThumbsValues {
    return this.slider.simpleJsSlider('getThumbsValues');
  }

  getMin(): number {
    return this.slider.simpleJsSlider('getMin');
  }

  getMax(): number {
    return this.slider.simpleJsSlider('getMax');
  }

  getStep(): number {
    return this.slider.simpleJsSlider('getStep');
  }

  isScaleEnabled(): boolean {
    return this.slider.simpleJsSlider('isScaleEnabled');
  }

  isPopUpsEnabled(): boolean {
    return this.slider.simpleJsSlider('isPopUpsEnabled');
  }

  getType(): string {
    return this.slider.simpleJsSlider('getType');
  }

  getOrientation(): string {
    return this.slider.simpleJsSlider('getOrientation');
  }

  refreshSliderState(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('refreshSliderState', sliderSettings);
  }
}

export default ControlPanelModel;
