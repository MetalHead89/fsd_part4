/**
 * @jest-environment jsdom
 */
/* eslint-disable dot-notation */

import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';
import SimpleSliderController from '../plugins/simple-slider/controller/simple-slider-controller';
import SimpleSliderView from '../plugins/simple-slider/view/simple-slider-view';

const defaultSettings = {
  orienation: 'horizontal',
  type: 'range',
  scale: true,
  popUps: true,
  min: 0,
  max: 10,
  step: 1,
  thumbOneValue: 3,
  thumbTwoValue: 7,
  sliderSize: { width: 500, height: 10 },
  thumbSize: { width: 20, height: 20 },
};
let settings = { ...defaultSettings };

let wrapper = document.createElement('div');
wrapper.classList.add('slider-wrapper');
document.append(wrapper);

let model = new SimpleSliderModel();
let view = new SimpleSliderView(wrapper);
let params = { model, view, settings };

let controller = new SimpleSliderController(params);

beforeEach(() => {
  settings = { ...defaultSettings };

  wrapper.remove();
  wrapper = document.createElement('div');
  wrapper.classList.add('slider-wrapper');

  model = new SimpleSliderModel();
  view = new SimpleSliderView(wrapper);
  params = { model, view, settings };

  controller = new SimpleSliderController(params);
});
