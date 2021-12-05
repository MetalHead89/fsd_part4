import { ISliderSettings } from '../../simple-js-slider/interfaces';
import Observer from '../../simple-js-slider/observer/Observer';
import { PanelModelEvents } from '../interfaces';

class ControlPanelModel extends Observer<PanelModelEvents> {
  private slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    super();
    this.slider = slider;
    this.bindContext();
    this.subscribeToEvents();
  }

  updateSliderPluginSettings(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('updateSliderSettings', sliderSettings);
  }

  getSliderSettings(): ISliderSettings {
    return this.slider.simpleJsSlider('getSliderSettings');
  }

  private handleSliderUpdate(settings: ISliderSettings) {
    this.notify('sliderIsUpdated', settings);
  }

  private bindContext() {
    this.handleSliderUpdate = this.handleSliderUpdate.bind(this);
    this.getSliderSettings = this.getSliderSettings.bind(this);
  }

  private subscribeToEvents() {
    this.slider.simpleJsSlider('register', (args: ISliderSettings) => {
      this.handleSliderUpdate(args);
    });
  }
}

export default ControlPanelModel;
