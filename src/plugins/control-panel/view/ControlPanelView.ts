import { boundMethod } from 'autobind-decorator';
import ControlPanel from './ControlPanel/ControlPanel';
import TextField from './TextField/TextField';
import groupElements from './groupElements';
import RadioButton from './RadioButton/RadioButton';
import Checkbox from './Checkbox/Checkbox';
import { ISliderSettings, IThumbsValues } from '../../simple-js-slider/interfaces';
import Observer from '../../simple-js-slider/observer/Observer';
import { PanelViewEvents } from '../interfaces';

class ControlPanelView extends Observer<PanelViewEvents> {
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

    this.subscribeToEvents();
    this.createPanel();
  }

  updateView(settings: ISliderSettings): void {
    this.setThumbsValues({
      thumbOne: settings.thumbOneValue,
      thumbTwo: settings.thumbTwoValue,
    });
    this.setMinValue(settings.min);
    this.setMaxValue(settings.max);
    this.setStep(settings.step);
    this.setScaleState(settings.isScale);
    this.setPopUpsState(settings.isPopUps);
    this.setTypeRadio(settings.type);
    this.setOrientationRadio(settings.orientation);
  }

  private setThumbsValues({ thumbOne, thumbTwo }: IThumbsValues): void {
    this.thumbOneValue.setValue(thumbOne);
    this.thumbTwoValue.setValue(thumbTwo);
  }

  private setMinValue(value: number): void {
    this.min.setValue(value);
  }

  private setMaxValue(value: number): void {
    this.max.setValue(value);
  }

  private setStep(value: number): void {
    this.step.setValue(value);
  }

  private setScaleState(state: boolean): void {
    this.scaleCheckbox.setState(state);
  }

  private setPopUpsState(state: boolean): void {
    this.popUpsCheckbox.setState(state);
  }

  private setTypeRadio(value: string): void {
    this.typeRadio.switchTo(value);
  }

  private setOrientationRadio(value: string): void {
    this.orientationRadio.switchTo(value);
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

  private subscribeToEvents(): void {
    this.thumbOneValue.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.thumbTwoValue.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.min.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.max.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.step.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.scaleCheckbox.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.popUpsCheckbox.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.typeRadio.register('PanelControlIsUpdated', this.notifyAboutChange);
    this.orientationRadio.register('PanelControlIsUpdated', this.notifyAboutChange);
  }

  private getOrientation(): string {
    return this.orientationRadio.getValue();
  }

  private getType(): string {
    return this.typeRadio.getValue();
  }

  private isScaleEnabled(): boolean {
    return this.scaleCheckbox.isEnabled();
  }

  private isPopUpsEnabled(): boolean {
    return this.popUpsCheckbox.isEnabled();
  }

  private getMin(): number {
    return this.min.getValue();
  }

  private getMax(): number {
    return this.max.getValue();
  }

  private getStep(): number {
    return this.step.getValue();
  }

  private getThumbOneValue(): number {
    return this.thumbOneValue.getValue();
  }

  private getThumbTwoValue(): number {
    return this.thumbTwoValue.getValue();
  }

  @boundMethod
  private notifyAboutChange() {
    this.switchOrientation();
    this.notify('controlPanelDataUpdated', this.getPanelSettings());
  }

  private getPanelSettings(): ISliderSettings {
    return {
      orientation: this.getOrientation(),
      type: this.getType(),
      isScale: this.isScaleEnabled(),
      isPopUps: this.isPopUpsEnabled(),
      min: this.getMin(),
      max: this.getMax(),
      step: this.getStep(),
      thumbOneValue: this.getThumbOneValue(),
      thumbTwoValue: this.getThumbTwoValue(),
    };
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
