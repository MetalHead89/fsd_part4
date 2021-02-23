import {
  IObserver,
  ISubject,
  IThumbsValues,
} from '../../simple-slider/interfaces';
import Subject from '../../simple-slider/subject/subject';

export default class ControlPanelModel extends Subject implements IObserver {
  private slider: JQuery<HTMLElement>;
  private subject: ISubject;

  constructor(slider: JQuery<HTMLElement>) {
    super();
    this.slider = slider;
    this.subject = slider.simpleSlider('getModelSubject');
    this.subject.register('thumbsPosIsUpdated', this);
  }

  update(eventType: string): void {
    if (eventType === 'thumbsPosIsUpdated') {
      this.notify('thumbsPosIsUpdated');
    }
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

  setThumbsValues(thumbs: IThumbsValues): void {
    this.slider.simpleSlider('setThumbsValues', thumbs);
  }
}
