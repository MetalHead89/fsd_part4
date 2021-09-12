/* eslint-disable comma-dangle */

import ControlPanel from './control-panel/control-panel';
import TextField from './text-field/text-field';
import groupElements from './group-elements';
import RadioButton from './radio-button/radio-button';
import Checkbox from './checkbox/checkbox';
import { IObserver, IThumbsValues } from '../../simple-slider/interfaces';
import Subject from '../../simple-slider/subject/subject';

class ControlPanelView extends Subject implements IObserver {
  private sliderWrapper: HTMLDivElement;
  private controlPanel: ControlPanel;
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
    this.controlPanel = new ControlPanel();
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
    this.controlPanel.append(
      groupElements({
        wrapperClass: 'control-panel__text-fields-group',
        elements: [
          this.thumbOneValue.getControl(),
          this.thumbTwoValue.getControl(),
        ],
      }),
    );

    this.controlPanel.append(
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
      wrapperClass: 'control-panel__wrapper',
      elements: [typeRadioGroup, orientationRadioGroup],
    });

    const checkboxesGroup = groupElements({
      header: 'on/off elements',
      wrapperClass: 'control-panel__wrapper',
      elements: [
        this.scaleCheckbox.getControl(),
        this.popUpsCheckbox.getControl(),
      ],
    });

    this.controlPanel.append(
      groupElements({
        wrapperClass: 'control-panel__checkboxes-and-radios-wrapper',
        elements: [allRadiosGroup, checkboxesGroup],
      }),
    );

    this.sliderWrapper.append(this.controlPanel.getElement());
  }

  private subscribeToEvents(): void {
    this.thumbOneValue.register('controlPanelDataUpdated', this);
    this.thumbTwoValue.register('controlPanelDataUpdated', this);
    this.min.register('controlPanelDataUpdated', this);
    this.max.register('controlPanelDataUpdated', this);
    this.step.register('controlPanelDataUpdated', this);
    this.typeRadio.register('controlPanelDataUpdated', this);
    this.orientationRadio.register('controlPanelDataUpdated', this);
    this.scaleCheckbox.register('controlPanelDataUpdated', this);
    this.popUpsCheckbox.register('controlPanelDataUpdated', this);
  }

  update(eventType: string): void {
    if (eventType === 'controlPanelDataUpdated') {
      this.notify('controlPanelDataUpdated');
      this.switchOrientation();
    }
  }

  private switchOrientation(): void {
    if (this.getOrientation() === 'horizontal') {
      this.controlPanel.switchToHorizontal();
      this.sliderWrapper.classList.remove('slider-wrapper_vertical');
      this.sliderWrapper.classList.add('slider-wrapper_horizontal');
    } else {
      this.controlPanel.switchToVertical();
      this.sliderWrapper.classList.remove('slider-wrapper_horizontal');
      this.sliderWrapper.classList.add('slider-wrapper_vertical');
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

export default ControlPanelView;
