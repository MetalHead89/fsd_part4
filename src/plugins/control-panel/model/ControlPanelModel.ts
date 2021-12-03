import { ISliderSettings } from '../../simple-js-slider/interfaces';
import Observer from '../../simple-js-slider/observer/Observer';

class ControlPanelModel extends Observer {
  private slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    super();
    this.slider = slider;
    this.subscribeToEvents();
  }

  getSliderSettings(): ISliderSettings {
    return this.slider.simpleJsSlider('getSliderSettings');
  }

  updateSliderPluginSettings(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('updateSliderSettings', sliderSettings);
  }

  private subscribeToEvents() {
    //   this.sliderObserver.register('settingsIsUpdated', () => {
    //     this.notify('sliderIsUpdated');
    //   });
    //   this.sliderObserver.register('modelIsUpdated', () => {
    //     this.notify('sliderIsUpdated');
    //   });
  }
}

export default ControlPanelModel;
