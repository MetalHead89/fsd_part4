/**
 * @jest-environment jsdom
 */

import SimpleSliderView from '../plugins/simple-slider/view/simple-slider-view';

describe('Assemble slider', () => {
  test('The getSliderSize method from the SimpleSliderView class must be called once', () => {
    const wrapper = document.createElement('div');
    const view = new SimpleSliderView(wrapper);

    const div = wrapper.querySelector('.slider');
    console.log(div);
  });
});
