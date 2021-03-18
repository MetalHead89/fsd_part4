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
  test('SliderSize should be {width: 500, height: 10}', () => {
    delete settings.sliderSize;
    model.refreshSliderState(settings);
    expect(model['sliderSize'].width).toBe(500);
    expect(model['sliderSize'].height).toBe(10);
  });
  test('ThumbSize should be {width: 20, height: 20}', () => {
    delete settings.thumbSize;
    model.refreshSliderState(settings);
    expect(model['thumbSize'].width).toBe(20);
    expect(model['thumbSize'].height).toBe(20);
  });
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
  test('ThumbTwoValue should be equal thumbValueOne', () => {
    settings.type = 'single';
    settings.thumbOneValue = 9;
    model.refreshSliderState(settings);
    settings.type = 'range';
    settings.thumbOneValue = 10;
    model.refreshSliderState(settings);
    expect(model['thumbOneValue'] === model['thumbTwoValue']).toBe(true);
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
  test('Min should be 10', () => {
    settings.min = 50;
    model.refreshSliderState(settings);
    expect(model['min']).toBe(9);
  });
  test('Max should be 40', () => {
    settings.max = 40;
    model.refreshSliderState(settings);
    expect(model['max']).toBe(40);
  });
  test('Max should be 0', () => {
    settings.max = -50;
    model.refreshSliderState(settings);
    expect(model['max']).toBe(1);
  });
  test('Step should be 8', () => {
    settings.step = 8;
    model.refreshSliderState(settings);
    expect(model['step']).toBe(8);
  });
  test('Step should be 1', () => {
    settings.step = 0;
    model.refreshSliderState(settings);
    expect(model['step']).toBe(1);
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
  test('Should be thumbOne: 0 and thumbTwo: 9', () => {
    const position = {
      thumbOne: { left: -45, top: 0 },
      thumbTwo: { left: 450, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(0);
    expect(model['thumbTwoValue']).toBe(9);
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
  test('Should be {width: 500, height: 0}', () => {
    model.setSliderSize({ width: 500, height: -20 });
    expect(model['sliderSize'].width).toBe(500);
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

describe('Set thumb values', () => {
  test('Should be {thumbOne: 1, thumbTwo: 8}', () => {
    model.setThumbsValues({ thumbOne: 1, thumbTwo: 8 });
    expect(model['thumbOneValue']).toBe(1);
    expect(model['thumbTwoValue']).toBe(8);
  });
  test('Should be {thumbOne: 0, thumbTwo: 10}', () => {
    model.setThumbsValues({ thumbOne: -5, thumbTwo: 15 });
    expect(model['thumbOneValue']).toBe(0);
    expect(model['thumbTwoValue']).toBe(10);
  });
  test('Should be {thumbOne: 3, thumbTwo: 7}', () => {
    model.setThumbsValues({ thumbOne: 9, thumbTwo: 7 });
    expect(model['thumbOneValue']).toBe(3);
    expect(model['thumbTwoValue']).toBe(7);
  });
  test('Should be {thumbOne: 3, thumbTwo: 7}', () => {
    model.setThumbsValues({ thumbOne: 3, thumbTwo: 1 });
    expect(model['thumbOneValue']).toBe(3);
    expect(model['thumbTwoValue']).toBe(7);
  });
});

describe('Get min', () => {
  test('Should be 0', () => {
    expect(model.getMin()).toBe(0);
  });
  test('Should be 2', () => {
    settings.min = 2;
    model = new SimpleSliderModel(settings);
    expect(model.getMin()).toBe(2);
  });
});

describe('Get max', () => {
  test('Should be 10', () => {
    expect(model.getMax()).toBe(10);
  });
  test('Should be 5', () => {
    settings.max = 5;
    model = new SimpleSliderModel(settings);
    expect(model.getMax()).toBe(5);
  });
});

describe('Get step', () => {
  test('Should be 1', () => {
    expect(model.getStep()).toBe(1);
  });
  test('Should be 2', () => {
    settings.step = 2;
    model = new SimpleSliderModel(settings);
    expect(model.getStep()).toBe(2);
  });
});

describe('Get scale state', () => {
  test('Should be true', () => {
    expect(model.getScaleState()).toBe(true);
  });
  test('Should be false', () => {
    settings.scale = false;
    model = new SimpleSliderModel(settings);
    expect(model.getScaleState()).toBe(false);
  });
});

describe('Get pop-ups state', () => {
  test('Should be true', () => {
    expect(model.getPopUpsState()).toBe(true);
  });
  test('Should be false', () => {
    settings.popUps = false;
    model = new SimpleSliderModel(settings);
    expect(model.getPopUpsState()).toBe(false);
  });
});

describe('Get type', () => {
  test('Should be range', () => {
    expect(model.getType()).toBe('range');
  });
  test('Should be single', () => {
    settings.type = 'single';
    model = new SimpleSliderModel(settings);
    expect(model.getType()).toBe('single');
  });
});

describe('Get orientation', () => {
  test('Should be horizontal', () => {
    expect(model.getOrientation()).toBe('horizontal');
  });
  test('Should be vertical', () => {
    settings.orientation = 'vertical';
    model = new SimpleSliderModel(settings);
    expect(model.getOrientation()).toBe('vertical');
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

describe('Get thumb values', () => {
  test('Should be {thumbOne: 3, thumbTwo: 7}', () => {
    expect(model.getThumbsValues().thumbOne).toBe(3);
    expect(model.getThumbsValues().thumbTwo).toBe(7);
  });
  test('Should be {thumbOne: 5, thumbTwo: 9}', () => {
    model.setThumbsValues({ thumbOne: 5, thumbTwo: 9 });
    expect(model.getThumbsValues().thumbOne).toBe(5);
    expect(model.getThumbsValues().thumbTwo).toBe(9);
  });
});

describe('Get scale points', () => {
  test('Length of the scale points array should be 11', () => {
    const scalePoints = model.getScalePoints({ width: 10, height: 10 });
    expect(scalePoints.length).toBe(11);
  });
  test('The value of the 5th element of the array of scale points should be 5', () => {
    const scalePoints = model.getScalePoints({ width: 10, height: 10 });
    expect(scalePoints[5].value).toBe(5);
  });
  test('The size of the 5th element of the array of scale points should be {width: 10, height: 10}', () => {
    const scalePoints = model.getScalePoints({ width: 10, height: 10 });
    expect(scalePoints[5].size.width).toBe(10);
    expect(scalePoints[5].size.height).toBe(10);
  });
  test('The position of the 5th element of the array of scale points should be {left: 0, top: 20}', () => {
    const scalePoints = model.getScalePoints({ width: 10, height: 10 });
    expect(scalePoints[5].position.left).toBe(245);
    expect(scalePoints[5].position.top).toBe(0);
  });
  test('Length of the scale points array should be 14', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    settings.max = 13;
    model.refreshSliderState(settings);
    const scalePoints = model.getScalePoints({ width: 10, height: 10 });
    expect(scalePoints.length).toBe(14);
  });
  test('Length of the scale points array should be 45', () => {
    settings.max = 354;
    model.refreshSliderState(settings);
    const scalePoints = model.getScalePoints({ width: 10, height: 10 });
    expect(scalePoints.length).toBe(45);
  });
  test('Length of the scale points array should be 25', () => {
    settings.max = 354;
    settings.step = 15;
    model.refreshSliderState(settings);
    const scalePoints = model.getScalePoints({ width: 10, height: 10 });
    expect(scalePoints.length).toBe(25);
  });
});

describe('Set thumb position on click position', () => {
  test('ThumbOne position value should be 3', () => {
    model.setThumbPosOnClickPos({ left: 100, top: 0 });
    expect(model.getThumbsValues().thumbOne).toBe(2);
  });
  test('ThumbTwo should be not change position', () => {
    model.setThumbPosOnClickPos({ left: 100, top: 0 });
    expect(model.getThumbsValues().thumbTwo).toBe(7);
  });
  test('ThumbOne should be not change position', () => {
    model.setThumbPosOnClickPos({ left: 100, top: 0 });
    expect(model.getThumbsValues().thumbOne).toBe(2);
  });
  test('ThumbTwo position value should be 8', () => {
    model.setThumbPosOnClickPos({ left: 400, top: 0 });
    expect(model.getThumbsValues().thumbTwo).toBe(8);
  });
  test('ThumbTwo position value should be 8', () => {
    settings.type = 'single';
    model.refreshSliderState(settings);
    model.setThumbPosOnClickPos({ left: 400, top: 0 });
    expect(model.getThumbsValues().thumbOne).toBe(8);
  });
});
