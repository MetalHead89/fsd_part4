/* eslint-disable dot-notation */
// /* eslint-disable comma-dangle */

import { ISliderSettings } from '../plugins/simple-slider/interfaces';
import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';

let settings: ISliderSettings;
let model: SimpleSliderModel;

beforeEach(() => {
  settings = {
    orientation: 'horizontal',
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

  model = new SimpleSliderModel(settings);
  model.refreshSliderState(settings);
});

describe('Refresh slider state', () => {
  test('Orientation should be vertical', () => {
    settings.orientation = 'vertical';
    model.refreshSliderState(settings);
    expect(model['orientation']).toBe('vertical');
  });
  test('Type should be single', () => {
    settings.type = 'single';
    model.refreshSliderState(settings);
    expect(model['type']).toBe('single');
  });
  test('Scale should be false', () => {
    settings.scale = false;
    model.refreshSliderState(settings);
    expect(model['scale']).toBe(false);
  });
  test('PopUps should be false', () => {
    settings.popUps = false;
    model.refreshSliderState(settings);
    expect(model['popUps']).toBe(false);
  });
  test('Min should be 7', () => {
    settings.min = 7;
    model.refreshSliderState(settings);
    expect(model['min']).toBe(7);
  });
  test('Max should be 40', () => {
    settings.max = 40;
    model.refreshSliderState(settings);
    expect(model['max']).toBe(40);
  });
  test('Step should be 8', () => {
    settings.step = 8;
    model.refreshSliderState(settings);
    expect(model['step']).toBe(8);
  });
  test('ThumbOneValue should be 6', () => {
    settings.thumbOneValue = 6;
    model.refreshSliderState(settings);
    expect(model['thumbOneValue']).toBe(6);
  });
  test('ThumbTwoValue should be 10', () => {
    settings.thumbTwoValue = 10;
    model.refreshSliderState(settings);
    expect(model['thumbTwoValue']).toBe(10);
  });
  test('SliderSize widh should be 300 and height 50', () => {
    settings.sliderSize = { width: 300, height: 50 };
    model.refreshSliderState(settings);
    expect(model['sliderSize'].width).toBe(300);
    expect(model['sliderSize'].height).toBe(50);
  });
  test('ThumbSize widh should be 750 and height 35', () => {
    settings.thumbSize = { width: 750, height: 35 };
    model.refreshSliderState(settings);
    expect(model['thumbSize'].width).toBe(750);
    expect(model['thumbSize'].height).toBe(35);
  });
});

describe('Update thumbs state', () => {
  test('Should be thumbOne: 5 and thumbTwo: 9', () => {
    const position = {
      thumbOne: { left: 250, top: 0 },
      thumbTwo: { left: 450, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(5);
    expect(model['thumbTwoValue']).toBe(9);
  });
  test('Should be thumbOne: 3 and thumbTwo: 7', () => {
    const position = {
      thumbOne: { left: 450, top: 0 },
      thumbTwo: { left: 250, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(3);
    expect(model['thumbTwoValue']).toBe(7);
  });
  test('Should be thumbOne: 0 and thumbTwo: 0', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);
    const position = {
      thumbOne: { left: 250, top: 0 },
      thumbTwo: { left: 450, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(0);
    expect(model['thumbTwoValue']).toBe(0);
  });
  test('Should be thumbOne: 0 and thumbTwo: 0', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);
    const position = {
      thumbOne: { left: 0, top: 100 },
      thumbTwo: { left: 0, top: 400 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(2);
    expect(model['thumbTwoValue']).toBe(8);
  });
});

describe('Set slider size', () => {
  test('Should be {width: 80, height: 15}', () => {
    model.setSliderSize({ width: 80, height: 15 });
    expect(model['sliderSize'].width).toBe(80);
    expect(model['sliderSize'].height).toBe(15);
  });
  test('Should be {width: 0, height: 15}', () => {
    model.setSliderSize({ width: -80, height: 15 });
    expect(model['sliderSize'].width).toBe(0);
    expect(model['sliderSize'].height).toBe(15);
  });
  test('Should be {width: 80, height: 0}', () => {
    model.setSliderSize({ width: 80, height: 0 });
    expect(model['sliderSize'].width).toBe(80);
    expect(model['sliderSize'].height).toBe(0);
  });
});

describe('Set thumb size', () => {
  test('Should be {width: 80, height: 15}', () => {
    model.setThumbSize({ width: 80, height: 15 });
    expect(model['thumbSize'].width).toBe(80);
    expect(model['thumbSize'].height).toBe(15);
  });
  test('Should be {width: 0, height: 15}', () => {
    model.setThumbSize({ width: -80, height: 15 });
    expect(model['thumbSize'].width).toBe(0);
    expect(model['thumbSize'].height).toBe(15);
  });
  test('Should be {width: 80, height: 0}', () => {
    model.setThumbSize({ width: 80, height: 0 });
    expect(model['thumbSize'].width).toBe(80);
    expect(model['thumbSize'].height).toBe(0);
  });
});

describe('Get progress bar params', () => {
  test('Should be position: {{left: 100, top: 0} and size: {width: 212, height: 10}}', () => {
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(144, 0);
    expect(progressParams.position.top).toBeCloseTo(0, 0);
    expect(progressParams.size.width).toBeCloseTo(212, 0);
    expect(progressParams.size.height).toBeCloseTo(10, 0);
  });
  test('Should be position: {{left: 0, top: 100} and size: {width: 10, height: 212}}', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(0, 0);
    expect(progressParams.position.top).toBeCloseTo(144, 0);
    expect(progressParams.size.width).toBeCloseTo(10, 0);
    expect(progressParams.size.height).toBeCloseTo(212, 0);
  });
  test('Should be position: {{left: 0, top: 0} and size: {width: 164, height: 10}}', () => {
    settings.type = 'single';
    model.refreshSliderState(settings);
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(0, 0);
    expect(progressParams.position.top).toBeCloseTo(0, 0);
    expect(progressParams.size.width).toBeCloseTo(164, 0);
    expect(progressParams.size.height).toBeCloseTo(10, 0);
  });
  test('Should be position: {{left: 0, top: 0} and size: {width: 10, height: 239}}', () => {
    settings.orientation = 'vertical';
    settings.type = 'single';
    settings.sliderSize = { width: 10, height: 750 };
    model.refreshSliderState(settings);
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(0, 0);
    expect(progressParams.position.top).toBeCloseTo(0, 0);
    expect(progressParams.size.width).toBeCloseTo(10, 0);
    expect(progressParams.size.height).toBeCloseTo(239, 0);
  });
});

describe('Get thumbs positions', () => {
  test('Should be thumbOne: {left: 126, top: 0} and thumbTwo: {left: 294, top: 0}', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };
    const pos = model.getThumbsPos();

    expect(pos.thumbOne.left).toBeCloseTo(126);
    expect(pos.thumbOne.top).toBe(0);
    expect(pos.thumbTwo).not.toBe(null);
    if (pos.thumbTwo !== null) {
      expect(pos.thumbTwo.left).toBeCloseTo(294);
      expect(pos.thumbTwo.top).toBe(0);
    }
  });
  test('Should be thumbOne: {left: 0, top: 0} and thumbTwo: {left: 0, top: 420}', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 440, height: 440 };
    model['thumbSize'] = { width: 20, height: 20 };
    model['thumbOneValue'] = -5;
    model['thumbTwoValue'] = 77;
    const pos = model.getThumbsPos();

    expect(pos.thumbOne.left).toBe(0);
    expect(pos.thumbOne.top).toBe(0);
    expect(pos.thumbTwo).not.toBe(null);
    if (pos.thumbTwo !== null) {
      expect(pos.thumbTwo.left).toBeCloseTo(0);
      expect(pos.thumbTwo.top).toBe(420);
    }
  });
});

describe('Get pop ups params', () => {
  test('Should be posOne: {left: 154, top: 0} and posTwo: {left: 346, top: 0}', () => {
    const params = model.getPopUpsParams();
    expect(params.popUpOne.position.left).toBeCloseTo(154, 0);
    expect(params.popUpOne.position.top).toBeCloseTo(0, 0);
    expect(params.popUpTwo.position.left).toBeCloseTo(346, 0);
    expect(params.popUpTwo.position.top).toBeCloseTo(0, 0);
  });
  test('Should be popUpOne: 3 and popUpTwo: 7}', () => {
    const params = model.getPopUpsParams();
    expect(params.popUpOne.value).toBe(3);
    expect(params.popUpTwo.value).toBe(7);
  });
  test('Should be posOne: {left: 0, top: 154} and posTwo: {left: 0, top: 346}', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);

    const params = model.getPopUpsParams();
    expect(params.popUpOne.position.left).toBeCloseTo(0, 0);
    expect(params.popUpOne.position.top).toBeCloseTo(154, 0);
    expect(params.popUpTwo.position.left).toBeCloseTo(0, 0);
    expect(params.popUpTwo.position.top).toBeCloseTo(346, 0);
  });
  test('Should be popUpOne: 3 and popUpTwo: 7}', () => {
    const params = model.getPopUpsParams();
    expect(params.popUpOne.value).toBe(3);
    expect(params.popUpTwo.value).toBe(7);
  });
});
