import { IThumbsValues } from '../../simple-slider/interfaces';

export default class ControlPanelModel {
  private slider: JQuery<HTMLElement>;

  constructor(slider: JQuery<HTMLElement>) {
    this.slider = slider;
  }

  getThumbsValues(): IThumbsValues {
    return this.slider.simpleSlider('getThumbsValues');
  }

  getMax(): number {
    return this.slider.simpleSlider('getMax');
  }
}
