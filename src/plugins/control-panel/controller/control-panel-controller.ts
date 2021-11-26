import { ISliderSettings } from '../../simple-js-slider/interfaces';
import ControlPanelModel from '../model/control-panel-model';
import ControlPanelView from '../view/control-panel-view';

class ControlPanelController {
  private view: ControlPanelView;
  private model: ControlPanelModel;

  constructor(view: ControlPanelView, model: ControlPanelModel) {
    this.view = view;
    this.model = model;
    this.init();

    this.bindContext();
    this.subscribeToEvents();
  }

  private init(): void {
    this.updateView();
  }

  private updateView(): void {
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
  }

  private bindContext(): void {
    this.updateSliderPluginSettings = this.updateSliderPluginSettings.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  private subscribeToEvents(): void {
    this.view.observer.register('controlPanelDataUpdated', this.updateSliderPluginSettings);
    this.model.observer.register('sliderIsUpdated', this.updateView);
  }

  private updateSliderPluginSettings(): void {
    const sliderSettings = {
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

    this.model.updateSliderPluginSettings(sliderSettings);
  }
}

export default ControlPanelController;
