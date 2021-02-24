/* eslint-disable comma-dangle */

import Container from './container/container';
import TextField from './text-field/text-field';
import groupElements from './group-elements';
import RadioButton from './radio-button/radio-button';
import Checkbox from './checkbox/checkbox';
import { IObserver, IThumbsValues } from '../../simple-slider/interfaces';
import Subject from '../../simple-slider/subject/subject';

export default class ControlPanelView extends Subject implements IObserver {
  private sliderWrapper: HTMLDivElement;
  private thumbOneValue: TextField;
  private thumbTwoValue: TextField;
  private min: TextField;
  private max: TextField;
  private step: TextField;
  private typeRadio: RadioButton;
  private orientationRadio: RadioButton;
  private scaleCheckbox: Checkbox;
  private popUpsCheckbox: Checkbox;

  constructor(sliderWrapper: HTMLDivElement) {
    super();
    this.sliderWrapper = sliderWrapper;
    this.thumbOneValue = new TextField('First thumb value');
    this.thumbTwoValue = new TextField('Second thumb value');
    this.min = new TextField('min value');
    this.max = new TextField('max value');
    this.step = new TextField('step');
    this.typeRadio = new RadioButton(
      'type',
      { label: 'single', value: 'single' },
      { label: 'range', value: 'range' },
    );
    this.orientationRadio = new RadioButton(
      'orientation',
      { label: 'horizontal', value: 'horizontal' },
      { label: 'vertical', value: 'vertical' },
    );
    this.scaleCheckbox = new Checkbox({
      label: 'scale',
      name: 'scale',
      value: 'scale',
    });
    this.popUpsCheckbox = new Checkbox({
      label: 'pop ups',
      name: 'popUps',
      value: 'popUps',
    });

    this.subscribeToEvents();
    this.createPanel();
  }

  private createPanel(): void {
    const container = new Container();

    container.append(
      groupElements({
        wrapperClass: 'control-panel__text-fields-group',
        elements: [
          this.thumbOneValue.getControl(),
          this.thumbTwoValue.getControl(),
        ],
      }),
    );

    container.append(
      groupElements({
        wrapperClass: 'control-panel__text-fields-group',
        elements: [
          this.min.getControl(),
          this.max.getControl(),
          this.step.getControl(),
        ],
      }),
    );

    const typeRadioGroup = groupElements({
      header: 'type',
      wrapperClass: '',
      elements: [this.typeRadio.getControl()],
    });

    const orientationRadioGroup = groupElements({
      header: 'orientation',
      wrapperClass: '',
      elements: [this.orientationRadio.getControl()],
    });

    const allRadiosGroup = groupElements({
      wrapperClass: '',
      elements: [typeRadioGroup, orientationRadioGroup],
    });

    const checkboxesGroup = groupElements({
      header: 'on/off elements',
      wrapperClass: '',
      elements: [
        this.scaleCheckbox.getControl(),
        this.popUpsCheckbox.getControl(),
      ],
    });

    container.append(
      groupElements({
        wrapperClass: 'control-panel__checkboxes-and-radios-wrapper',
        elements: [allRadiosGroup, checkboxesGroup],
      }),
    );

    this.sliderWrapper.append(container.getElement());
  }

  private subscribeToEvents(): void {
    this.thumbOneValue.register('fieldValueIsUpdated', this);
    this.thumbTwoValue.register('fieldValueIsUpdated', this);
  }

  update(eventType: string): void {
    if (eventType === 'fieldValueIsUpdated') {
      this.notify('fieldValueIsUpdated');
    }
  }

  setThumbsValues(thumbsValues: IThumbsValues): void {
    this.thumbOneValue.setValue(thumbsValues.thumbOne);
    this.thumbTwoValue.setValue(thumbsValues.thumbTwo);
  }

  setMinValue(value: number): void {
    this.min.setValue(value);
  }

  setMaxValue(value: number): void {
    this.max.setValue(value);
  }

  setStep(value: number): void {
    this.step.setValue(value);
  }

  setScaleState(state: boolean): void {
    this.scaleCheckbox.setState(state);
  }

  setPopUpsState(state: boolean): void {
    this.popUpsCheckbox.setState(state);
  }

  setTypeRadio(value: string): void {
    this.typeRadio.switchTo(value);
  }

  setOrientationRadio(value: string): void {
    this.orientationRadio.switchTo(value);
  }

  getOrientation(): string {
    return this.orientationRadio.getValue();
  }

  getType(): string {
    return this.typeRadio.getValue();
  }

  getScaleState(): boolean {
    return this.scaleCheckbox.getState();
  }

  getPopUpsState(): boolean {
    return this.popUpsCheckbox.getState();
  }

  getMin(): number {
    return this.min.getValue();
  }

  getMax(): number {
    return this.max.getValue();
  }

  getStep(): number {
    return this.step.getValue();
  }

  getThumbOneValue(): number {
    return this.thumbOneValue.getValue();
  }

  getThumbTwoValue(): number {
    return this.thumbTwoValue.getValue();
  }

  getThumbsValues(): IThumbsValues {
    return {
      thumbOne: this.thumbOneValue.getValue(),
      thumbTwo: this.thumbTwoValue.getValue(),
    };
  }
}
