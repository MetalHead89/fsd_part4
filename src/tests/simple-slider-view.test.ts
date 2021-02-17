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

describe('Update method', () => {
  test('Notify method of the SimpleSliderView class should be called once', () => {
    const spy = spyOn(view, 'notify');
    view.update('thumbIsDragged');
    expect(spy).toBeCalledTimes(1);
  });
  test('The resetZIndex method of the thumbOne object should be called once', () => {
    const spy = spyOn(view['thumbOne'], 'resetZIndex');
    view.update('thumbIsCatched');
    expect(spy).toBeCalledTimes(1);
  });
  test('The resetZIndex method of thumbTwo must be called twice', () => {
    const spy = spyOn(view['thumbTwo'], 'resetZIndex');
    view.update('thumbIsCatched');
    view.update('thumbIsCatched');
    expect(spy).toBeCalledTimes(2);
  });
});

describe('Get thumb size', () => {
  test('Should be true', () => {
    expect(view.getThumbSize()).toBe(true);
  });
});

describe('Get slider size', () => {
  test('Should be true', () => {
    expect(view.getSliderSize()).toBe(true);
  });
});

describe('Get thumbs positions', () => {
  test('ThumbOne should be true', () => {
    expect(view.getThumbsPos().thumbOne).toBe(true);
  });
  test('ThumbTwo should be true', () => {
    expect(view.getThumbsPos().thumbTwo).toBe(true);
  });
});

describe('Update thumbs', () => {
  test('The moveTo method of the thumbOne object should be called once', () => {
    const spy = spyOn(view['thumbOne'], 'moveTo');
    view.updateThumbs({
      thumbOne: { left: 0, top: 0 },
      thumbTwo: { left: 0, top: 0 },
    });
    expect(spy).toBeCalledTimes(1);
  });
  test('The moveTo method of thumbTwo must be called twice', () => {
    const spy = spyOn(view['thumbTwo'], 'moveTo');
    view.updateThumbs({
      thumbOne: { left: 0, top: 0 },
      thumbTwo: { left: 0, top: 0 },
    });
    view.updateThumbs({
      thumbOne: { left: 0, top: 0 },
      thumbTwo: { left: 0, top: 0 },
    });
    expect(spy).toBeCalledTimes(2);
  });
});
