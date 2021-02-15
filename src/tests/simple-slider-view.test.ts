/**
 * @jest-environment jsdom
 */

import SimpleSliderView from '../plugins/simple-slider/view/simple-slider-view';
import Thumb from '../plugins/simple-slider/view/thumb/thumb';

jest.mock('../plugins/simple-slider/view/thumb/thumb');

let wrapper: HTMLDivElement;
let view: SimpleSliderView;

beforeEach(() => {
  wrapper = document.createElement('div');
  view = new SimpleSliderView(wrapper);
});

// jest.mock('../plugins/simple-slider/view/thumb/thumb', () => {
//   return {
//     Thumb: jest.fn().mockImplementation(() => {
//       return {
//         getSize: () => {},
//       };
//     }),
//   };
// });
Thumb.prototype.getSize = jest
  .fn()
  .mockImplementation(() => ({ width: 50, height: 50 }));

Thumb.prototype.getElement = jest.fn().mockImplementation(() => {
  const div = document.createElement('div');
  div.classList.add('slider__thumb');
  return div;
});

describe('Assemble slider', () => {
  test('Wrapper should be contain a slider element', () => {
    expect(wrapper.querySelector('.slider')).not.toBeNull();
  });
  test('Wrapper should be contain a track element', () => {
    expect(wrapper.querySelector('.slider__track')).not.toBeNull();
  });
  test('Wrapper should be contain a thumb element', () => {
    expect(wrapper.querySelector('.slider__thumb')).not.toBeNull();
  });
  test('Wrapper should be contain a pop-up element', () => {
    expect(wrapper.querySelector('.slider__pop-up')).not.toBeNull();
  });
  test('Wrapper should be contain a progress-bar element', () => {
    expect(wrapper.querySelector('.slider__progress-bar')).not.toBeNull();
  });
  test('Wrapper should be contain a scale element', () => {
    expect(wrapper.querySelector('.slider__scale')).not.toBeNull();
  });

  test('Wrapper should be contain a scale element', () => {
    console.log(view.getThumbSize());
  });
});
