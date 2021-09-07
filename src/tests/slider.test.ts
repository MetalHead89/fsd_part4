/**
 * @jest-environment jsdom
 */
/* eslint-disable dot-notation */

import Slider from '../plugins/simple-slider/view/slider/slider';

let slider: Slider;

beforeEach(() => {
  slider = new Slider();
});

describe('Append', () => {
  test('Slider should contain element with class new-elem', () => {
    const elem = document.createElement('div');
    elem.classList.add('new-elem');
    slider.append(elem);
    expect(slider.getElement().querySelector('.new-elem')).not.toBeNull();
  });
  test('Slider should contain element with class second-elem', () => {
    const elem = document.createElement('div');
    elem.classList.add('second-elem');
    slider.append(elem);
    expect(slider.getElement().querySelector('.second-elem')).not.toBeNull();
  });
});

describe('Set margins', () => {
  test('Slider margins should be {left: 25, top: 77, right: 13, bottom: 2}', () => {
    slider.setMargins({
      left: 25,
      top: 77,
      right: 13,
      bottom: 2,
    });

    expect(slider['element'].style.marginLeft).toBe('25px');
    expect(slider['element'].style.marginTop).toBe('77px');
    expect(slider['element'].style.marginRight).toBe('13px');
    expect(slider['element'].style.marginBottom).toBe('2px');
  });
  test('Slider margins should be {left: 84, top: 97, right: 67, bottom: 73}', () => {
    slider.setMargins({
      left: 84,
      top: 97,
      right: 67,
      bottom: 73,
    });

    expect(slider['element'].style.marginLeft).toBe('84px');
    expect(slider['element'].style.marginTop).toBe('97px');
    expect(slider['element'].style.marginRight).toBe('67px');
    expect(slider['element'].style.marginBottom).toBe('73px');
  });
});

describe('Reset margins', () => {
  test('Slider margins should be {left: 0, top: 0, right: 0, bottom: 0}', () => {
    slider.setMargins({
      left: 25,
      top: 77,
      right: 13,
      bottom: 2,
    });

    slider.resetMargins();

    expect(slider['element'].style.marginLeft).toBe('0px');
    expect(slider['element'].style.marginTop).toBe('0px');
    expect(slider['element'].style.marginRight).toBe('0px');
    expect(slider['element'].style.marginBottom).toBe('0px');
  });
  test('Slider margins should be {left: 0px, top: 0, right: 0, bottom: 0}', () => {
    slider.setMargins({
      left: 84,
      top: 97,
      right: 67,
      bottom: 73,
    });

    slider.resetMargins();

    expect(slider['element'].style.marginLeft).toBe('0px');
    expect(slider['element'].style.marginTop).toBe('0px');
    expect(slider['element'].style.marginRight).toBe('0px');
    expect(slider['element'].style.marginBottom).toBe('0px');
  });
});
