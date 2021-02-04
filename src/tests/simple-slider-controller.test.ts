/**
 * @jest-environment jsdom
 */

import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';
import SimpleSliderController from '../plugins/simple-slider/controller/simple-slider-controller';

let model = new SimpleSliderModel();
let controller = new SimpleSliderController(model);

beforeEach(() => {
  model = new SimpleSliderModel();
  controller = new SimpleSliderController(model);
});

describe('Set slider size', () => {
  test('Slider width should be 5 and height should be 9', () => {
    controller.setSliderSize({ width: 5, height: 9 });
    expect(model['sliderSize'].width).toBe(5);
    expect(model['sliderSize'].height).toBe(9);
  });

  test('Slider width should be 0 and height should be 12', () => {
    controller.setSliderSize({ width: -1, height: 12 });
    expect(model['sliderSize'].width).toBe(0);
    expect(model['sliderSize'].height).toBe(12);
  });

  test('Slider width should be 54 and height should be 0', () => {
    controller.setSliderSize({ width: 54, height: -1 });
    expect(model['sliderSize'].width).toBe(54);
    expect(model['sliderSize'].height).toBe(0);
  });

  test('Slider width should be 0 and height should be 0', () => {
    controller.setSliderSize({ width: 0, height: 0 });
    expect(model['sliderSize'].width).toBe(0);
    expect(model['sliderSize'].height).toBe(0);
  });
});
