import { IThumbsValues } from '../../simple-slider/interfaces';

export default class ControlPanelModel {
  private slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
  }

  getThumbsValues(): IThumbsValues {
    return this.slider.simpleSlider('getThumbsValues');
  }

  getMin(): number {
    return this.slider.simpleSlider('getMin');
  }

  getMax(): number {
    return this.slider.simpleSlider('getMax');
  }

  getStep(): number {
    return this.slider.simpleSlider('getStep');
  }
}
