/* eslint-disable dot-notation */
// /* eslint-disable comma-dangle */

import { ISliderSettings } from '../plugins/simple-slider/interfaces';
import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';

let settings: ISliderSettings;
let model: SimpleSliderModel;

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
    sliderSize: { width: 500, height: 10 },
    thumbSize: { width: 20, height: 20 },
  };

  model = new SimpleSliderModel(settings);
  model.refreshSliderState(settings);
});

describe('Метод refreshSliderState класса SimpleSliderModel', () => {
  test('Размер Slider должен соответствовать размеру из объекта settings', () => {
    delete settings.sliderSize;
    model.refreshSliderState(settings);
    expect(model['sliderSize'].width).toBe(500);
    expect(model['sliderSize'].height).toBe(10);
  });
  test('Размер Thumb должен соответствовать размеру из объекта settings', () => {
    delete settings.thumbSize;
    model.refreshSliderState(settings);
    expect(model['thumbSize'].width).toBe(20);
    expect(model['thumbSize'].height).toBe(20);
  });
  test('Ориентация должна соответствовать ориентации из объекта settings', () => {
    settings.orientation = 'vertical';
    model.refreshSliderState(settings);
    expect(model['orientation']).toBe('vertical');
  });
  test('Тип должен соответствовать типу из объекта settings', () => {
    settings.type = 'single';
    model.refreshSliderState(settings);
    expect(model['type']).toBe('single');
  });
  test('thumbOneValue и thumbTwoValue не должны быть равны', () => {
    settings.type = 'single';
    settings.thumbOneValue = 9;
    model.refreshSliderState(settings);
    settings.type = 'range';
    settings.thumbOneValue = 10;
    model.refreshSliderState(settings);
    expect(model['thumbOneValue'] !== model['thumbTwoValue']).toBe(true);
  });
  test('Scale должен быть отключен', () => {
    settings.isScale = false;
    model.refreshSliderState(settings);
    expect(model['isScale']).toBe(false);
  });
  test('PopUps должны быть отключены', () => {
    settings.isPopUps = false;
    model.refreshSliderState(settings);
    expect(model['isPopUps']).toBe(false);
  });
  test('Минимальное значение Slider должно соответствовать минимальному значению из объекта settings', () => {
    settings.min = 7;
    model.refreshSliderState(settings);
    expect(model['min']).toBe(7);
  });
  test('Минимальное значение Slider должно соответствовать минимальному значению из объекта settings', () => {
    settings.min = 50;
    model.refreshSliderState(settings);
    expect(model['min']).toBe(0);
  });
  test('Максимальное значение Slider должно соответствовать максимальному значению из объекта settings', () => {
    settings.max = 40;
    model.refreshSliderState(settings);
    expect(model['max']).toBe(40);
  });
  test('Максимальное значение Slider должно соответствовать максимальному значению из объекта settings', () => {
    settings.max = -50;
    model.refreshSliderState(settings);
    expect(model['max']).toBe(10);
  });
  test('Шаг Thumb должен соответствовать шагу из объекта settings', () => {
    settings.step = 8;
    model.refreshSliderState(settings);
    expect(model['step']).toBe(8);
  });
  test('Шаг Thumb должен соответствовать шагу из объекта settings', () => {
    settings.step = 0;
    model.refreshSliderState(settings);
    expect(model['step']).toBe(1);
  });
  test('Значение ThumbOne должно соответствовать значению из объекта settings', () => {
    settings.thumbOneValue = 6;
    model.refreshSliderState(settings);
    expect(model['thumbOneValue']).toBe(6);
  });
  test('Значение ThumbTwo должно соответствовать значению из объекта settings', () => {
    settings.thumbTwoValue = 10;
    model.refreshSliderState(settings);
    expect(model['thumbTwoValue']).toBe(10);
  });
  test('Размер Slider должен соответствовать размеру из объекта settings', () => {
    settings.sliderSize = { width: 300, height: 50 };
    model.refreshSliderState(settings);
    expect(model['sliderSize'].width).toBe(300);
    expect(model['sliderSize'].height).toBe(50);
  });
  test('Размер Thumb должен соответствовать размеру из объекта settings', () => {
    settings.thumbSize = { width: 750, height: 35 };
    model.refreshSliderState(settings);
    expect(model['thumbSize'].width).toBe(750);
    expect(model['thumbSize'].height).toBe(35);
  });
});

describe('Метод updateThumbsState класса SimpleSliderModel', () => {
  test('Значения Thumbs должны корректно изменяться в зависимости от полученной позиции', () => {
    const position = {
      thumbOne: { left: 250, top: 0 },
      thumbTwo: { left: 450, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(5);
    expect(model['thumbTwoValue']).toBe(9);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от полученной позиции', () => {
    const position = {
      thumbOne: { left: 450, top: 0 },
      thumbTwo: { left: 250, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(5);
    expect(model['thumbTwoValue']).toBe(9);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от полученной позиции', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);
    const position = {
      thumbOne: { left: 250, top: 0 },
      thumbTwo: { left: 450, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(0);
    expect(model['thumbTwoValue']).toBe(0);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от полученной позиции', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);
    const position = {
      thumbOne: { left: 0, top: 100 },
      thumbTwo: { left: 0, top: 400 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(2);
    expect(model['thumbTwoValue']).toBe(8);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от полученной позиции', () => {
    const position = {
      thumbOne: { left: -45, top: 0 },
      thumbTwo: { left: 450, top: 0 },
    };
    model.updateThumbsState(position);
    expect(model['thumbOneValue']).toBe(0);
    expect(model['thumbTwoValue']).toBe(9);
  });
});

describe('Метод setSliderSize класса SimpleSliderModel', () => {
  test('Размер слайдера должен корректно изменяться в зависимости от полученного объекта', () => {
    model.setSliderSize({ width: 80, height: 15 });
    expect(model['sliderSize'].width).toBe(80);
    expect(model['sliderSize'].height).toBe(15);
  });
  test('Размер слайдера должен корректно изменяться в зависимости от полученного объекта', () => {
    model.setSliderSize({ width: -80, height: 15 });
    expect(model['sliderSize'].width).toBe(0);
    expect(model['sliderSize'].height).toBe(15);
  });
  test('Размер слайдера должен корректно изменяться в зависимости от полученного объекта', () => {
    model.setSliderSize({ width: 80, height: 0 });
    expect(model['sliderSize'].width).toBe(80);
    expect(model['sliderSize'].height).toBe(0);
  });
  test('Размер слайдера должен корректно изменяться в зависимости от полученного объекта', () => {
    model.setSliderSize({ width: 500, height: -20 });
    expect(model['sliderSize'].width).toBe(500);
    expect(model['sliderSize'].height).toBe(0);
  });
});

describe('Метод setThumbSize класса SimpleSliderModel', () => {
  test('Размер Thumb должен корректно изменяться в зависимости от полученного объекта', () => {
    model.setThumbSize({ width: 80, height: 15 });
    expect(model['thumbSize'].width).toBe(80);
    expect(model['thumbSize'].height).toBe(15);
  });
  test('Размер Thumb должен корректно изменяться в зависимости от полученного объекта', () => {
    model.setThumbSize({ width: -80, height: 15 });
    expect(model['thumbSize'].width).toBe(0);
    expect(model['thumbSize'].height).toBe(15);
  });
  test('Размер Thumb должен корректно изменяться в зависимости от полученного объекта', () => {
    model.setThumbSize({ width: 80, height: 0 });
    expect(model['thumbSize'].width).toBe(80);
    expect(model['thumbSize'].height).toBe(0);
  });
});

describe('Метод setThumbsValues класса SimpleSliderModel', () => {
  test('Значения Thumbs должны корректно изменяться в зависимости от полученного объекта', () => {
    model.setThumbsValues({ thumbOne: 1, thumbTwo: 8 });
    expect(model['thumbOneValue']).toBe(1);
    expect(model['thumbTwoValue']).toBe(8);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от полученного объекта', () => {
    model.setThumbsValues({ thumbOne: -5, thumbTwo: 15 });
    expect(model['thumbOneValue']).toBe(0);
    expect(model['thumbTwoValue']).toBe(10);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от полученного объекта', () => {
    model.setThumbsValues({ thumbOne: 9, thumbTwo: 7 });
    expect(model['thumbOneValue']).toBe(7);
    expect(model['thumbTwoValue']).toBe(9);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от полученного объекта', () => {
    model.setThumbsValues({ thumbOne: 3, thumbTwo: 1 });
    expect(model['thumbOneValue']).toBe(1);
    expect(model['thumbTwoValue']).toBe(3);
  });
});

describe('Метод getMin класса SimpleSliderModel', () => {
  test('Должно возвращаться значение соответствующее значению min в объекте settings', () => {
    expect(model.getMin()).toBe(0);
  });
  test('Должно возвращаться значение соответствующее значению min в объекте settings', () => {
    settings.min = 2;
    model = new SimpleSliderModel(settings);
    expect(model.getMin()).toBe(2);
  });
});

describe('Метод getMax класса SimpleSliderModel', () => {
  test('Должно возвращаться значение соответствующее значению max в объекте settings', () => {
    expect(model.getMax()).toBe(10);
  });
  test('Должно возвращаться значение соответствующее значению max в объекте settings', () => {
    settings.max = 5;
    model = new SimpleSliderModel(settings);
    expect(model.getMax()).toBe(5);
  });
});

describe('Метод getStep класса SimpleSliderModel', () => {
  test('Должно возвращаться значение соответствующее значению step в объекте settings', () => {
    expect(model.getStep()).toBe(1);
  });
  test('Должно возвращаться значение соответствующее значению step в объекте settings', () => {
    settings.step = 2;
    model = new SimpleSliderModel(settings);
    expect(model.getStep()).toBe(2);
  });
});

describe('Метод isScaleEnabled класса SimpleSliderModel', () => {
  test('Должно возвращаться значение соответствующее значению scale в объекте settings', () => {
    expect(model.isScaleEnabled()).toBe(true);
  });
  test('Должно возвращаться значение соответствующее значению scale в объекте settings', () => {
    settings.isScale = false;
    model = new SimpleSliderModel(settings);
    expect(model.isScaleEnabled()).toBe(false);
  });
});

describe('Метод isPopUpsEnabled класса SimpleSliderModel', () => {
  test('Должно возвращаться значение соответствующее значению popUps в объекте settings', () => {
    expect(model.isPopUpsEnabled()).toBe(true);
  });
  test('Должно возвращаться значение соответствующее значению popUps в объекте settings', () => {
    settings.isPopUps = false;
    model = new SimpleSliderModel(settings);
    expect(model.isPopUpsEnabled()).toBe(false);
  });
});

describe('Метод getType класса SimpleSliderModel', () => {
  test('Должно возвращаться значение соответствующее значению type в объекте settings', () => {
    expect(model.getType()).toBe('range');
  });
  test('Должно возвращаться значение соответствующее значению type в объекте settings', () => {
    settings.type = 'single';
    model = new SimpleSliderModel(settings);
    expect(model.getType()).toBe('single');
  });
});

describe('Метод getOrientation класса SimpleSliderModel', () => {
  test('Должно возвращаться значение соответствующее значению orientation в объекте settings', () => {
    expect(model.getOrientation()).toBe('horizontal');
  });
  test('Должно возвращаться значение соответствующее значению orientation в объекте settings', () => {
    settings.orientation = 'vertical';
    model = new SimpleSliderModel(settings);
    expect(model.getOrientation()).toBe('vertical');
  });
});

describe('Метод getProgressBarParams класса SimpleSliderModel', () => {
  test('Должны вычисляться корректные параметры progressBar', () => {
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(144, 0);
    expect(progressParams.position.top).toBeCloseTo(0, 0);
    expect(progressParams.size.width).toBeCloseTo(212, 0);
    expect(progressParams.size.height).toBeCloseTo(10, 0);
  });
  test('Должны вычисляться корректные параметры progressBar', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(0, 0);
    expect(progressParams.position.top).toBeCloseTo(144, 0);
    expect(progressParams.size.width).toBeCloseTo(10, 0);
    expect(progressParams.size.height).toBeCloseTo(212, 0);
  });
  test('Должны вычисляться корректные параметры progressBar', () => {
    settings.type = 'single';
    model.refreshSliderState(settings);
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(0, 0);
    expect(progressParams.position.top).toBeCloseTo(0, 0);
    expect(progressParams.size.width).toBeCloseTo(164, 0);
    expect(progressParams.size.height).toBeCloseTo(10, 0);
  });
  test('Должны вычисляться корректные параметры progressBar', () => {
    settings.orientation = 'vertical';
    settings.type = 'single';
    settings.sliderSize = { width: 10, height: 750 };
    model.refreshSliderState(settings);
    const progressParams = model.getProgressBarParams();
    expect(progressParams.position.left).toBeCloseTo(0, 0);
    expect(progressParams.position.top).toBeCloseTo(0, 0);
    expect(progressParams.size.width).toBeCloseTo(10, 0);
    expect(progressParams.size.height).toBeCloseTo(239, 0);
  });
});

describe('Метод getThumbsPositions класса SimpleSliderModel', () => {
  test('Должны вычисляться корректные позиции Thumbs', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };
    const pos = model.getThumbsPositions();

    expect(pos.thumbOne.left).toBeCloseTo(126);
    expect(pos.thumbOne.top).toBe(0);
    expect(pos.thumbTwo).not.toBe(null);
    if (pos.thumbTwo !== null) {
      expect(pos.thumbTwo.left).toBeCloseTo(294);
      expect(pos.thumbTwo.top).toBe(0);
    }
  });
  test('Должны вычисляться корректные позиции Thumbs', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 440, height: 440 };
    model['thumbSize'] = { width: 20, height: 20 };
    model['thumbOneValue'] = -5;
    model['thumbTwoValue'] = 77;
    const pos = model.getThumbsPositions();

    expect(pos.thumbOne.left).toBe(0);
    expect(pos.thumbOne.top).toBe(0);
    expect(pos.thumbTwo).not.toBe(null);
    if (pos.thumbTwo !== null) {
      expect(pos.thumbTwo.left).toBeCloseTo(0);
      expect(pos.thumbTwo.top).toBe(420);
    }
  });
});

describe('Метод getPopUpsParams класса SimpleSliderModel', () => {
  test('Должны вычисляться корректные параметры popUps', () => {
    const params = model.getPopUpsParams();
    expect(params.popUpOne.position.left).toBeCloseTo(154, 0);
    expect(params.popUpOne.position.top).toBeCloseTo(0, 0);
    expect(params.popUpTwo.position.left).toBeCloseTo(346, 0);
    expect(params.popUpTwo.position.top).toBeCloseTo(0, 0);
  });
  test('Должны вычисляться корректные параметры popUps', () => {
    const params = model.getPopUpsParams();
    expect(params.popUpOne.value).toBe(3);
    expect(params.popUpTwo.value).toBe(7);
  });
  test('Должны вычисляться корректные параметры popUps', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    model.refreshSliderState(settings);

    const params = model.getPopUpsParams();
    expect(params.popUpOne.position.left).toBeCloseTo(0, 0);
    expect(params.popUpOne.position.top).toBeCloseTo(154, 0);
    expect(params.popUpTwo.position.left).toBeCloseTo(0, 0);
    expect(params.popUpTwo.position.top).toBeCloseTo(346, 0);
  });
  test('Должны вычисляться корректные параметры popUps', () => {
    const params = model.getPopUpsParams();
    expect(params.popUpOne.value).toBe(3);
    expect(params.popUpTwo.value).toBe(7);
  });
});

describe('Метод getThumbsValues класса SimpleSliderModel', () => {
  test('Должны возвращаться значения соответствующие значениям thumbOneValue и thumbTwoValue', () => {
    expect(model.getThumbsValues().thumbOne).toBe(3);
    expect(model.getThumbsValues().thumbTwo).toBe(7);
  });
  test('Должны возвращаться значения соответствующие значениям thumbOneValue и thumbTwoValue', () => {
    model.setThumbsValues({ thumbOne: 5, thumbTwo: 9 });
    expect(model.getThumbsValues().thumbOne).toBe(5);
    expect(model.getThumbsValues().thumbTwo).toBe(9);
  });
});

describe('Метод getScalePoints класса SimpleSliderModel', () => {
  test('Количество scalePoints должно корректно вычисляться', () => {
    const scalePoints = model.getScalePoints();
    expect(scalePoints.length).toBe(11);
  });
  test('Значения scalePoints должны корректно вычисляться', () => {
    const scalePoints = model.getScalePoints();
    expect(scalePoints[5].value).toBe(5);
  });
  test('Размеры scalePoints должны корректно вычисляться', () => {
    model.setScalePointSize({ width: 10, height: 10 });
    const scalePoints = model.getScalePoints();
    expect(scalePoints[5].size.width).toBe(10);
    expect(scalePoints[5].size.height).toBe(10);
  });
  test('Позиции scalePoints должны корректно вычисляться', () => {
    model.setScalePointSize({ width: 10, height: 10 });
    const scalePoints = model.getScalePoints();
    expect(scalePoints[5].position.left).toBe(245);
    expect(scalePoints[5].position.top).toBe(0);
  });
  test('Количество scalePoints должно корректно вычисляться', () => {
    settings.orientation = 'vertical';
    settings.sliderSize = { width: 10, height: 500 };
    settings.max = 13;
    model.refreshSliderState(settings);
    const scalePoints = model.getScalePoints();
    expect(scalePoints.length).toBe(14);
  });
  test('Количество scalePoints должно корректно вычисляться', () => {
    model.setScalePointSize({ width: 10, height: 10 });
    settings.max = 354;
    model.refreshSliderState(settings);
    const scalePoints = model.getScalePoints();
    expect(scalePoints.length).toBe(45);
  });
  test('Количество scalePoints должно корректно вычисляться', () => {
    settings.max = 354;
    settings.step = 15;
    model.refreshSliderState(settings);
    const scalePoints = model.getScalePoints();
    expect(scalePoints.length).toBe(25);
  });
});

describe('Метод setThumbPositionOnClickPosition класса SimpleSliderModel', () => {
  test('Значения Thumbs должны корректно изменяться в зависимости от позиции клика', () => {
    model.setThumbPositionOnClickPosition({ left: 100, top: 0 });
    expect(model.getThumbsValues().thumbOne).toBe(2);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от позиции клика', () => {
    model.setThumbPositionOnClickPosition({ left: 100, top: 0 });
    expect(model.getThumbsValues().thumbTwo).toBe(7);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от позиции клика', () => {
    model.setThumbPositionOnClickPosition({ left: 100, top: 0 });
    expect(model.getThumbsValues().thumbOne).toBe(2);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от позиции клика', () => {
    model.setThumbPositionOnClickPosition({ left: 400, top: 0 });
    expect(model.getThumbsValues().thumbTwo).toBe(8);
  });
  test('Значения Thumbs должны корректно изменяться в зависимости от позиции клика', () => {
    settings.type = 'single';
    model.refreshSliderState(settings);
    model.setThumbPositionOnClickPosition({ left: 400, top: 0 });
    expect(model.getThumbsValues().thumbOne).toBe(8);
  });
});
