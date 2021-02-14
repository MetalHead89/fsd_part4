/**
 * @jest-environment jsdom
 */

import SimpleSliderView from '../plugins/simple-slider/view/simple-slider-view';
// import * as orignalModel from '../plugins/simple-slider/model/simple-slider-model';

// jest.mock('../plugins/simple-slider/model/simple-slider-model');

// const mockedView = orignalView as jest.Mocked<typeof orignalView>;
// const SimpleSliderView = mockedView.default;

describe('Assemble slider', () => {
  test('The getSliderSize method from the SimpleSliderView class must be called once', () => {
    const wrapper = document.createElement('div');
    const view = new SimpleSliderView(wrapper);

    const div = wrapper.querySelector('.slider');
    console.log(div);
  });
});
