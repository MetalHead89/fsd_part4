/**
 * @jest-environment jsdom
 */
/* eslint-disable dot-notation */

import Slider from '../plugins/simple-js-slider/view/Slider/Slider';

let slider: Slider;

beforeEach(() => {
  slider = new Slider();
});

describe('Метод append класса Slider', () => {
  test('Элемент Slider должен содержать элемент с классом new-elem', () => {
    const elem = document.createElement('div');
    elem.classList.add('new-elem');
    slider.append(elem);
    expect(slider.getControl().querySelector('.new-elem')).not.toBeNull();
  });
  test('Элемент Slider должен содержать элемент с классом second-elem', () => {
    const elem = document.createElement('div');
    elem.classList.add('second-elem');
    slider.append(elem);
    expect(slider.getControl().querySelector('.second-elem')).not.toBeNull();
  });
});

describe('Метод setMargins класса Slider', () => {
  test('Отступы элемента ProgressBar должны быть изменены в соответствии с переданным в методе объектом', () => {
    slider.setMargins({
      left: 25,
      top: 77,
      right: 13,
      bottom: 2,
    });

    expect(slider['control'].style.marginLeft).toBe('25px');
    expect(slider['control'].style.marginTop).toBe('77px');
    expect(slider['control'].style.marginRight).toBe('13px');
    expect(slider['control'].style.marginBottom).toBe('2px');
  });
  test('Отступы элемента ProgressBar должны быть изменены в соответствии с переданным в методе объектом', () => {
    slider.setMargins({
      left: 84,
      top: 97,
      right: 67,
      bottom: 73,
    });

    expect(slider['control'].style.marginLeft).toBe('84px');
    expect(slider['control'].style.marginTop).toBe('97px');
    expect(slider['control'].style.marginRight).toBe('67px');
    expect(slider['control'].style.marginBottom).toBe('73px');
  });
});

describe('Метод resetMargins класса Slider', () => {
  test('Отступы элемента Slider должны быть равны 0', () => {
    slider.setMargins({
      left: 25,
      top: 77,
      right: 13,
      bottom: 2,
    });

    slider.resetMargins();

    expect(slider['control'].style.marginLeft).toBe('0px');
    expect(slider['control'].style.marginTop).toBe('0px');
    expect(slider['control'].style.marginRight).toBe('0px');
    expect(slider['control'].style.marginBottom).toBe('0px');
  });
  test('Отступы элемента Slider должны быть равны 0', () => {
    slider.setMargins({
      left: 84,
      top: 97,
      right: 67,
      bottom: 73,
    });

    slider.resetMargins();

    expect(slider['control'].style.marginLeft).toBe('0px');
    expect(slider['control'].style.marginTop).toBe('0px');
    expect(slider['control'].style.marginRight).toBe('0px');
    expect(slider['control'].style.marginBottom).toBe('0px');
  });
});
