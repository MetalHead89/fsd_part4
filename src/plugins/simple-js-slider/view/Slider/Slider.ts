/* eslint-disable object-curly-newline */

import { ISliderMargins } from '../../interfaces';
import UIControl from '../UIControl/UIControl';

class Slider extends UIControl {
  constructor() {
    super('slider');
  }

  append(control: HTMLDivElement): void {
    this.control.append(control);
  }

  setMargins({ left, top, right, bottom }: ISliderMargins): void {
    this.control.style.marginLeft = `${left}px`;
    this.control.style.marginTop = `${top}px`;
    this.control.style.marginRight = `${right}px`;
    this.control.style.marginBottom = `${bottom}px`;
  }

  resetMargins(): void {
    this.control.style.margin = '0';
  }
}

export default Slider;
