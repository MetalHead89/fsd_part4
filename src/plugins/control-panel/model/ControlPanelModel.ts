import { ISliderSettings } from '../../simple-js-slider/interfaces';
import Observer from '../../simple-js-slider/observer/Observer';

class ControlPanelModel extends Observer {
  private slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    super();
    this.slider = slider;
    this.bindContext();
    this.subscribeToEvents();
  }

  getSliderSettings(): ISliderSettings {
    return this.slider.simpleJsSlider('getSliderSettings');
  }

  updateSliderPluginSettings(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('updateSliderSettings', sliderSettings);
  }

  private handleSliderUpdate() {
    this.notify('sliderIsUpdated');
  }

  private bindContext() {
    this.handleSliderUpdate = this.handleSliderUpdate.bind(this);
  }

  private subscribeToEvents() {
    this.slider.simpleJsSlider('register', this.handleSliderUpdate);
  }
}

export default ControlPanelModel;
