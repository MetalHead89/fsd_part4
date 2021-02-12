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

const body = document.querySelector('body');
let wrapper = document.createElement('div');
wrapper.classList.add('slider-wrapper');
wrapper.style.width = '500px';
wrapper.style.height = '10px';
body?.append(wrapper);

let model = new SimpleSliderModel();
let view = new SimpleSliderView(wrapper);
let params = { model, view, settings };

let controller = new SimpleSliderController(params);

beforeEach(() => {
  settings = { ...defaultSettings };

  wrapper.remove();
  wrapper = document.createElement('div');
  wrapper.classList.add('slider-wrapper');
  body?.append(wrapper);

  model = new SimpleSliderModel();
  view = new SimpleSliderView(wrapper);
  params = { model, view, settings };

  controller = new SimpleSliderController(params);
});

describe('Slider init', () => {
  test('Orientation should be vertical', () => {
    settings.orienation = 'vertical';
    controller = new SimpleSliderController({ view, model, settings });
    expect(model['orientation']).toBe('vertical');
  });
  test('Type should be single', () => {
    settings.type = 'single';
    controller = new SimpleSliderController({ view, model, settings });
    expect(model['type']).toBe('single');
  });
  test('Scale should be false', () => {
    settings.scale = false;
    controller = new SimpleSliderController({ view, model, settings });
    expect(model['scale']).toBe(false);
  });
  test('PopUps should be false', () => {
    settings.popUps = false;
    controller = new SimpleSliderController({ view, model, settings });
    expect(model['popUps']).toBe(false);
  });
  test('Min should be 5', () => {
    settings.min = 5;
    controller = new SimpleSliderController({ view, model, settings });
    expect(model['min']).toBe(5);
  });
  test('Max should be 7', () => {
    settings.max = 7;
    controller = new SimpleSliderController({ view, model, settings });
    expect(model['max']).toBe(7);
  });
  test('Step should be 2', () => {
    settings.step = 2;
    controller = new SimpleSliderController({ view, model, settings });
    expect(model['step']).toBe(2);
  });
  //   test('ThumbOneValue should be 1', () => {
  //     settings.thumbOneValue = 1;
  //     view['container']['element'].style.width = '500px';
  //     controller = new SimpleSliderController({ view, model, settings });
  //     expect(model['thumbOneValue']).toBe(1);
  //   });
  //   test('ThumbTwoValue should be 9', () => {
  //     settings.thumbTwoValue = 9;
  //     view['container']['element'].style.width = '500px';
  //     controller = new SimpleSliderController({ view, model, settings });
  //     expect(model['thumbTwoValue']).toBe(9);
  //   });
  //   test('SliderSize should be {width: 350, height: 31}', () => {
  //     view['container']['element'].style.width = '350px';
  //     view['container']['element'].style.height = '31px';
  //     controller = new SimpleSliderController({ view, model, settings });
  //     expect(model['sliderSize'].width).toBe(350);
  //     expect(model['sliderSize'].height).toBe(31);
  //   });
  //   test('ThumbSize should be {width: 45, height: 55}', () => {
  //     settings.thumbSize = { width: 45, height: 55 };
  //     controller = new SimpleSliderController({ view, model, settings });
  //     expect(model['thumbSize'].width).toBe(45);
  //     expect(model['thumbSize'].height).toBe(55);
  //   });
});
