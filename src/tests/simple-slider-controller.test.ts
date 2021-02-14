/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */

import SimpleSliderController from '../plugins/simple-slider/controller/simple-slider-controller';
import * as orignalModel from '../plugins/simple-slider/model/simple-slider-model';
import * as orignalView from '../plugins/simple-slider/view/simple-slider-view';

jest.mock('../plugins/simple-slider/model/simple-slider-model');
jest.mock('../plugins/simple-slider/view/simple-slider-view');

const mockedView = orignalView as jest.Mocked<typeof orignalView>;
const SimpleSliderView = mockedView.default;

const mockedModel = orignalModel as jest.Mocked<typeof orignalModel>;
const SimpleSliderModel = mockedModel.default;

const settings = {
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

const wrapper = document.createElement('div');
let model = new SimpleSliderModel();
let view = new SimpleSliderView(wrapper);

let controller: SimpleSliderController;

beforeEach(() => {
  SimpleSliderView.mockClear();
  view = new SimpleSliderView(wrapper);

  SimpleSliderModel.mockClear();
  model = new SimpleSliderModel();
});

describe('Slider init', () => {
  test('The getSliderSize method from the SimpleSliderView class must be called once', () => {
    controller = new SimpleSliderController({ model, view, settings });
    expect(SimpleSliderView.mock.instances[0].getSliderSize).toBeCalledTimes(1);
  });
  test('The getThumbSize method from the SimpleSliderView class must be called once', () => {
    controller = new SimpleSliderController({ model, view, settings });
    expect(SimpleSliderView.mock.instances[0].getThumbSize).toBeCalledTimes(1);
  });
  test('The fullStateUpdate method from the SimpleSliderModel class must be called once', () => {
    controller = new SimpleSliderController({ model, view, settings });
    expect(SimpleSliderModel.mock.instances[0].fullStateUpdate).toBeCalledTimes(
      1
    );
  });
});
