import { ISliderSettings, IObserver } from '../../simple-js-slider/interfaces';
import Observer from '../../simple-js-slider/observer/Observer';

class ControlPanelModel {
  observer: IObserver;
  private slider: JQuery<HTMLElement>;
  private sliderObserver: IObserver;

  constructor(slider: JQuery<HTMLElement>) {
    this.observer = new Observer();
    this.slider = slider;
    this.sliderObserver = this.slider.simpleJsSlider('getObserver');
    this.subscribeToEvents();
  }

  getSliderSettings(): ISliderSettings {
    return this.slider.simpleJsSlider('getSliderSettings');
  }

  updateSliderPluginSettings(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('updateSliderSettings', sliderSettings);
  }

  private subscribeToEvents() {
    this.sliderObserver.register('settingsIsUpdated', () => {
      this.observer.notify('sliderIsUpdated');
    });
    this.sliderObserver.register('modelIsUpdated', () => {
      this.observer.notify('sliderIsUpdated');
    });
  }
}

export default ControlPanelModel;
