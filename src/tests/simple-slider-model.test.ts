/* eslint-disable dot-notation */
/* eslint-disable comma-dangle */

import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';

let model = new SimpleSliderModel();
let settings = {
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

beforeEach(() => {
  model = new SimpleSliderModel();
  settings = {
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
});

describe('Full state update', () => {
  test('Orientation should be vertical', () => {
    settings.orienation = 'vertical';
    model.fullStateUpdate(settings);
    expect(model['orientation']).toBe('vertical');
  });
  test('Type should be single', () => {
    settings.type = 'single';
    model.fullStateUpdate(settings);
    expect(model['type']).toBe('single');
  });
  test('Scale should be false', () => {
    settings.scale = false;
    model.fullStateUpdate(settings);
    expect(model['scale']).toBe(false);
  });
  test('PopUps should be false', () => {
    settings.popUps = false;
    model.fullStateUpdate(settings);
    expect(model['popUps']).toBe(false);
  });
  test('Min should be 20', () => {
    settings.min = 20;
    model.fullStateUpdate(settings);
    expect(model['min']).toBe(20);
  });
  test('Max should be 40', () => {
    settings.max = 40;
    model.fullStateUpdate(settings);
    expect(model['max']).toBe(40);
  });
  test('Step should be 8', () => {
    settings.step = 8;
    model.fullStateUpdate(settings);
    expect(model['step']).toBe(8);
  });
  test('ThumbOneValue should be 6', () => {
    settings.thumbOneValue = 6;
    model.fullStateUpdate(settings);
    expect(model['thumbOneValue']).toBe(6);
  });
  test('ThumbTwoValue should be 10', () => {
    settings.thumbTwoValue = 10;
    model.fullStateUpdate(settings);
    expect(model['thumbTwoValue']).toBe(10);
  });
  test('SliderSize widh should be 300 and height 50', () => {
    settings.sliderSize = { width: 300, height: 50 };
    model.fullStateUpdate(settings);
    expect(model['sliderSize'].width).toBe(300);
    expect(model['sliderSize'].height).toBe(50);
  });
  test('ThumbSize widh should be 750 and height 35', () => {
    settings.thumbSize = { width: 750, height: 35 };
    model.fullStateUpdate(settings);
    expect(model['thumbSize'].width).toBe(750);
    expect(model['thumbSize'].height).toBe(35);
  });
});

describe('Thumb value to position', () => {
  test('Position left should be 0 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](-1);
    expect(position.left).toBe(0);
    expect(position.top).toBe(0);
  });

  test('Position left should be 0 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](0);
    expect(position.left).toBe(0);
    expect(position.top).toBe(0);
  });

  test('Position left should be 210 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](5);
    expect(position.left).toBe(210);
    expect(position.top).toBe(0);
  });

  test('Position left should be 420 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](11);
    expect(position.left).toBe(420);
    expect(position.top).toBe(0);
  });

  test('Position left should be 0 and top should be 420', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 440, height: 440 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](11);
    expect(position.left).toBe(0);
    expect(position.top).toBe(420);
  });

  test('Position left should be 0 and top should be 420', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 440, height: 440 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](7);
    expect(position.left).toBe(0);
    expect(position.top).toBeCloseTo(294);
  });
});

describe('Get thumbs positions', () => {
  test(
    'First thumb left position should be 126 and top should be 0' +
      'and second thumb left position should be 294 and top should be 0',
    () => {
      model['sliderSize'] = { width: 440, height: 10 };
      model['thumbSize'] = { width: 20, height: 20 };
      const pos = model.getThumbsPos();

      expect(pos.thumbOne.left).toBeCloseTo(126);
      expect(pos.thumbOne.top).toBe(0);
      expect(pos.thumbTwo.left).toBeCloseTo(294);
      expect(pos.thumbTwo.top).toBe(0);
    },
  );

  test(
    'First thumb left position should be 0 and top should be 0' +
      'and second thumb left position should be 0 and top should be 420',
    () => {
      model['orientation'] = 'vertical';
      model['sliderSize'] = { width: 440, height: 440 };
      model['thumbSize'] = { width: 20, height: 20 };
      model['thumbOneValue'] = -5;
      model['thumbTwoValue'] = 77;
      const pos = model.getThumbsPos();

      expect(pos.thumbOne.left).toBe(0);
      expect(pos.thumbOne.top).toBe(0);
      expect(pos.thumbTwo.left).toBeCloseTo(0);
      expect(pos.thumbTwo.top).toBe(420);
    },
  );
});

describe('Get pixels per value', () => {
  test('Should be 4.2', () => {
    model['sliderSize'] = { width: 440, height: 1440 };
    model['thumbSize'] = { width: 20, height: 200 };

    expect(model['getPxPerValue']()).toBeCloseTo(4.2);
  });

  test('Should be 12.4', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 440, height: 1440 };
    model['thumbSize'] = { width: 20, height: 200 };

    expect(model['getPxPerValue']()).toBeCloseTo(12.4);
  });

  test('Should be 6.4', () => {
    model['sliderSize'] = { width: 680, height: 50 };
    model['thumbSize'] = { width: 40, height: 30 };

    expect(model['getPxPerValue']()).toBeCloseTo(6.4);
  });

  test('Should be 0.2 ', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 680, height: 50 };
    model['thumbSize'] = { width: 40, height: 30 };

    expect(model['getPxPerValue']()).toBeCloseTo(0.2);
  });
});
