import { ISliderSettings, IObserver } from '../../simple-js-slider/interfaces';
import ObserverNew from '../../simple-js-slider/observer/observer';

class ControlPanelModel {
  observer: IObserver;
  private slider: JQuery<HTMLElement>;
  private sliderObserver: IObserver;

  constructor(slider: JQuery<HTMLElement>) {
    this.observer = new ObserverNew();
    this.slider = slider;
    this.sliderObserver = this.slider.simpleJsSlider('getObserver');
    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    this.sliderObserver.register('settingsIsUpdated', () => {
      this.observer.notify('sliderIsUpdated');
    });
    this.sliderObserver.register('modelIsUpdated', () => {
      this.observer.notify('sliderIsUpdated');
    });
  }

  getSliderSettings(): ISliderSettings {
    return this.slider.simpleJsSlider('getSliderSettings');
  }

  updateSliderPluginSettings(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('updateSliderSettings', sliderSettings);
  }
}

export default ControlPanelModel;
