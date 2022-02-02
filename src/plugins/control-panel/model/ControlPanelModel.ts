import { boundMethod } from 'autobind-decorator';
import { ISliderSettings } from '../../simple-js-slider/interfaces';
import Observer from '../../simple-js-slider/observer/Observer';
import { PanelModelEvents } from '../interfaces';

class ControlPanelModel extends Observer<PanelModelEvents> {
  private slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    super();
    this.slider = slider;
    this.subscribeToEvents();
  }

  updateSliderPluginSettings(sliderSettings: ISliderSettings): void {
    this.slider.simpleJsSlider('updateSettings', sliderSettings);
  }

  @boundMethod
  getSettings(): ISliderSettings {
    return this.slider.simpleJsSlider('getSettings');
  }

  @boundMethod
  private handleSliderUpdate(settings: ISliderSettings) {
    this.notify('sliderIsUpdated', settings);
  }

  private subscribeToEvents() {
    this.slider.simpleJsSlider('register', {
      event: 'settingsIsUpdated',
      callback: (args: ISliderSettings) => {
        this.handleSliderUpdate(args);
      },
    });

    this.slider.simpleJsSlider('register', {
      event: 'modelIsUpdated',
      callback: (args: ISliderSettings) => {
        this.handleSliderUpdate(args);
      },
    });
  }
}

export default ControlPanelModel;
