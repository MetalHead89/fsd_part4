import {
  IObserver,
  ISliderSettings,
  ISubject,
  IThumbsValues,
} from '../../simple-slider/interfaces';
import Subject from '../../simple-slider/subject/subject';
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
    this.subject = slider.simpleSlider('getModelSubject');
    this.subject.register('thumbsPositionsIsUpdated', this);
    this.subject.register('minIsUpdated', this);
    this.subject.register('maxIsUpdated', this);
    this.subject.register('stepIsUpdated', this);
  }

  update(eventType: string): void {
    this.events[eventType]();
  }

  getThumbsValues(): IThumbsValues {
    return this.slider.simpleSlider('getThumbsValues');
  }

  getMin(): number {
    return this.slider.simpleSlider('getMin');
  }

  getMax(): number {
    return this.slider.simpleSlider('getMax');
  }

  getStep(): number {
    return this.slider.simpleSlider('getStep');
  }

  getScaleState(): boolean {
    return this.slider.simpleSlider('getScaleState');
  }

  getPopUpsState(): boolean {
    return this.slider.simpleSlider('getPopUpsState');
  }

  getType(): string {
    return this.slider.simpleSlider('getType');
  }

  getOrientation(): string {
    return this.slider.simpleSlider('getOrientation');
  }

  refreshSliderState(sliderSettings: ISliderSettings): void {
    this.slider.simpleSlider('refreshSliderState', sliderSettings);
  }
}

export default ControlPanelModel;
