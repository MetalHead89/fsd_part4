/**
 * @jest-environment jsdom
 */

import SimpleSliderView from '../plugins/simple-slider/view/simple-slider-view';

jest.mock('../plugins/simple-slider/view/container/container');
jest.mock('../plugins/simple-slider/view/track/track');
jest.mock('../plugins/simple-slider/view/thumb/thumb');
jest.mock('../plugins/simple-slider/view/pop-up/pop-up');
jest.mock('../plugins/simple-slider/view/progress-bar/progress-bar');
jest.mock('../plugins/simple-slider/view/scale/scale');

let wrapper: HTMLDivElement;
let view: SimpleSliderView;

beforeEach(() => {
  wrapper = document.createElement('div');
  view = new SimpleSliderView(wrapper);
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
});

describe('Get thumb size', () => {
  test('Should be true', () => {
    expect(view.getThumbSize()).toBe(true);
  });
});
