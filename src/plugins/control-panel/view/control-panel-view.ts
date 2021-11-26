/* eslint-disable comma-dangle */

import ControlPanel from './control-panel/control-panel';
import TextField from './text-field/text-field';
import groupElements from './group-elements';
import RadioButton from './radio-button/radio-button';
import Checkbox from './checkbox/checkbox';
import { IThumbsValues } from '../../simple-js-slider/interfaces';
import ObserverNew from '../../simple-js-slider/observer/observer';

class ControlPanelView {
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
  observer: ObserverNew;

  constructor(sliderWrapper: HTMLDivElement) {
    this.observer = new ObserverNew();
    this.controlPanel = new ControlPanel();
    this.sliderWrapper = sliderWrapper;
    this.thumbOneValue = new TextField('First thumb value');
    this.thumbTwoValue = new TextField('Second thumb value');
    this.min = new TextField('min value');
    this.max = new TextField('max value');
    this.step = new TextField('step');
    this.typeRadio = new RadioButton(
      'type',
      { labelText: 'single', value: 'single' },
      { labelText: 'range', value: 'range' }
    );
    this.orientationRadio = new RadioButton(
      'orientation',
      { labelText: 'horizontal', value: 'horizontal' },
      { labelText: 'vertical', value: 'vertical' }
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

    this.bindContext();
    this.subscribeToEvents();
    this.createPanel();
  }

  setThumbsValues({ thumbOne, thumbTwo }: IThumbsValues): void {
    this.thumbOneValue.setValue(thumbOne);
    this.thumbTwoValue.setValue(thumbTwo);
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

  isScaleEnabled(): boolean {
    return this.scaleCheckbox.isEnabled();
  }

  isPopUpsEnabled(): boolean {
    return this.popUpsCheckbox.isEnabled();
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

  private createPanel(): void {
    this.controlPanel.append(
      groupElements({
        wrapperClass: 'control-panel__text-fields-group',
        elements: [this.thumbOneValue.getControl(), this.thumbTwoValue.getControl()],
      })
    );

    this.controlPanel.append(
      groupElements({
        wrapperClass: 'control-panel__text-fields-group',
        elements: [this.min.getControl(), this.max.getControl(), this.step.getControl()],
      })
    );

    const typeRadioGroup = groupElements({
      header: 'type',
      wrapperClass: 'control-panel__radio-group',
      elements: [this.typeRadio.getControl()],
    });

    const orientationRadioGroup = groupElements({
      header: 'orientation',
      wrapperClass: 'control-panel__radio-group',
      elements: [this.orientationRadio.getControl()],
    });

    const allRadiosGroup = groupElements({
      wrapperClass: 'control-panel__wrapper',
      elements: [typeRadioGroup, orientationRadioGroup],
    });

    const checkboxesGroup = groupElements({
      header: 'on/off elements',
      wrapperClass: 'control-panel__wrapper',
      elements: [this.scaleCheckbox.getControl(), this.popUpsCheckbox.getControl()],
    });

    this.controlPanel.append(
      groupElements({
        wrapperClass: 'control-panel__checkboxes-and-radios-wrapper',
        elements: [allRadiosGroup, checkboxesGroup],
      })
    );

    this.sliderWrapper.append(this.controlPanel.getElement());
  }

  private bindContext(): void {
    this.notifyAboutChange = this.notifyAboutChange.bind(this);
  }

  private subscribeToEvents(): void {
    this.thumbOneValue.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.thumbTwoValue.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.min.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.max.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.step.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.scaleCheckbox.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.popUpsCheckbox.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.typeRadio.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
    this.orientationRadio.observer.register('controlPanelDataUpdated', this.notifyAboutChange);
  }

  private notifyAboutChange() {
    this.switchOrientation();
    this.observer.notify('controlPanelDataUpdated');
  }

  private switchOrientation(): void {
    if (this.getOrientation() === 'horizontal') {
      this.controlPanel.switchToHorizontal();
      this.sliderWrapper.classList.remove('slider-wrapper_orientation_vertical');
      this.sliderWrapper.classList.add('slider-wrapper_orientation_horizontal');
    } else {
      this.controlPanel.switchToVertical();
      this.sliderWrapper.classList.remove('slider-wrapper_orientation_horizontal');
      this.sliderWrapper.classList.add('slider-wrapper_orientation_vertical');
    }
  }
}

export default ControlPanelView;
