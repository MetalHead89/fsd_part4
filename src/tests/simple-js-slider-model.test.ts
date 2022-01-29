/* eslint-disable dot-notation */
// /* eslint-disable comma-dangle */

import { ISliderSettings } from '../plugins/simple-js-slider/interfaces';
import SimpleJsSliderModel from '../plugins/simple-js-slider/model/SimpleJsSliderModel';

let settings: ISliderSettings;
let model: SimpleJsSliderModel;

beforeEach(() => {
  settings = {
    orientation: 'horizontal',
    type: 'range',
    isScale: true,
    isPopUps: true,
    min: 0,
    max: 10,
    step: 1,
    thumbOneValue: 3,
    thumbTwoValue: 7,
  };

  model = new SimpleJsSliderModel(settings);
  model.updateSettings(settings);
});

describe('Метод updateThumbsValues класса SimpleJsSliderModel', () => {
  test('Значение thumbOne должно быть равно 10', () => {
    model.updateThumbsValues({ thumbOne: 250, thumbTwo: 24 });
    expect(model['thumbOneValue']).toBe(10);
  });
  test('Значение thumbTwo должно быть равно 2', () => {
    model.updateThumbsValues({ thumbOne: 250, thumbTwo: 24 });
    expect(model['thumbTwoValue']).toBe(2);
  });
  test('Значение thumbTwo должно быть равно 7', () => {
    model.updateThumbsValues({ thumbOne: 250, thumbTwo: null });
    expect(model['thumbTwoValue']).toBe(7);
  });
});

describe('Метод getSettings класса SimpleJsSliderModel', () => {
  test('Должен возвращать объект с текущим состоянием слайдера', () => {
    const sliderSettings = model.getSettings();
    expect(sliderSettings.isPopUps).toBe(true);
    expect(sliderSettings.isScale).toBe(true);
    expect(sliderSettings.type).toBe('range');
    expect(sliderSettings.orientation).toBe('horizontal');
    expect(sliderSettings.min).toBe(0);
    expect(sliderSettings.max).toBe(10);
    expect(sliderSettings.step).toBe(1);
    expect(sliderSettings.thumbOneValue).toBe(3);
    expect(sliderSettings.thumbTwoValue).toBe(7);
  });
});

describe('Метод updateSettings класса SimpleJsSliderModel', () => {
  test('Должен корректно обновлять состояние слайдера', () => {
    const sliderSettings = {
      orientation: 'vertical',
      type: 'single',
      isScale: false,
      isPopUps: false,
      min: 2,
      max: 20,
      step: 3,
      thumbOneValue: 8,
      thumbTwoValue: 9,
    };

    model.updateSettings(sliderSettings);
    const newSettings = model.getSettings();

    expect(newSettings.isPopUps).toBe(false);
    expect(newSettings.isScale).toBe(false);
    expect(newSettings.type).toBe('single');
    expect(newSettings.orientation).toBe('vertical');
    expect(newSettings.min).toBe(2);
    expect(newSettings.max).toBe(20);
    expect(newSettings.step).toBe(3);
    expect(newSettings.thumbOneValue).toBe(8);
    expect(newSettings.thumbTwoValue).toBe(9);
  });

  test('Значения бегунков должны поменяться местами', () => {
    const sliderSettings = {
      orientation: 'vertical',
      type: 'single',
      isScale: false,
      isPopUps: false,
      min: 2,
      max: 20,
      step: 3,
      thumbOneValue: 8,
      thumbTwoValue: 3,
    };

    model.updateSettings(sliderSettings);
    const newSettings = model.getSettings();

    expect(newSettings.thumbOneValue).toBe(3);
    expect(newSettings.thumbTwoValue).toBe(8);
  });

  test('Значение Thumb не может быть меньше min', () => {
    const sliderSettings = {
      orientation: 'vertical',
      type: 'single',
      isScale: false,
      isPopUps: false,
      min: 2,
      max: 20,
      step: 3,
      thumbOneValue: 0,
      thumbTwoValue: 3,
    };

    model.updateSettings(sliderSettings);

    expect(model.getSettings().thumbOneValue).toBe(2);
  });

  test('Значение Thumb не может быть больше max', () => {
    const sliderSettings = {
      orientation: 'vertical',
      type: 'single',
      isScale: false,
      isPopUps: false,
      min: 2,
      max: 20,
      step: 3,
      thumbOneValue: 30,
      thumbTwoValue: 3,
    };

    model.updateSettings(sliderSettings);

    expect(model.getSettings().thumbOneValue).toBe(3);
    expect(model.getSettings().thumbTwoValue).toBe(20);
  });

  test('Минимальное значение Thumb не может быть больше max', () => {
    const sliderSettings = {
      orientation: 'vertical',
      type: 'single',
      isScale: false,
      isPopUps: false,
      min: 30,
      max: 10,
      step: 3,
      thumbOneValue: 0,
      thumbTwoValue: 3,
    };

    model.updateSettings(sliderSettings);

    expect(model.getSettings().min).toBe(0);
  });

  test('Максимальное значение Thumb не может быть больше min', () => {
    const sliderSettings = {
      orientation: 'vertical',
      type: 'single',
      isScale: false,
      isPopUps: false,
      min: 0,
      max: -1,
      step: 3,
      thumbOneValue: 0,
      thumbTwoValue: 3,
    };

    model.updateSettings(sliderSettings);

    expect(model.getSettings().max).toBe(10);
  });

  test('Количество шагов Thumb не может превышать максимально возможное количество шагов', () => {
    const sliderSettings = {
      orientation: 'vertical',
      type: 'single',
      isScale: false,
      isPopUps: false,
      min: 0,
      max: 10,
      step: 12,
      thumbOneValue: 0,
      thumbTwoValue: 3,
    };

    model.updateSettings(sliderSettings);

    expect(model.getSettings().step).toBe(1);
  });
});

describe('Метод getThumbsPositions класса SimpleJsSliderModel', () => {
  test('Должен возвращать корректные позиции Thumbs', () => {
    expect(model.getThumbsPositions().thumbOne.position).toBe(30);
    expect(model.getThumbsPositions().thumbTwo.position).toBe(70);
  });
});

describe('Метод getThumbValues класса SimpleJsSliderModel', () => {
  test('Должен возвращать корректные значения Thumbs', () => {
    expect(model.getThumbValues().thumbOne).toBe(3);
    expect(model.getThumbValues().thumbTwo).toBe(7);
  });
});

describe('Метод getPointsParams класса SimpleJsSliderModel', () => {
  test('Должен возвращать корректные параметры шкалы', () => {
    expect(model.getPointsParams()[3].position).toBe(30);
    expect(model.getPointsParams()[3].value).toBe(3);
  });
  test('Должен возвращать корректные параметры шкалы', () => {
    expect(model.getPointsParams()[5].position).toBe(50);
    expect(model.getPointsParams()[5].value).toBe(5);
  });
});
