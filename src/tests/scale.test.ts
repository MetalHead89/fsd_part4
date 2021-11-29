/**
 * @jest-environment jsdom
 */

/* eslint-disable operator-linebreak */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */

import Scale from '../plugins/simple-js-slider/view/Scale/Scale';

let scale: Scale;

const initEvt = (evt: MouseEvent) => {
  evt.initMouseEvent(
    'click',
    true,
    true,
    window,
    0,
    50,
    80,
    50,
    80,
    false,
    false,
    false,
    false,
    0,
    null
  );
};

beforeEach(() => {
  scale = new Scale();
});

describe('Клик по элементу Scale', () => {
  test('Метод notify объекта observer должен быть вызван один раз', () => {
    const evt = document.createEvent('MouseEvent');
    const spy = spyOn<any>(scale.observer, 'notify');

    initEvt(evt);
    scale['control'].dispatchEvent(evt);

    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод addPoint класса Scale', () => {
  test('Количество добавленных делений на шкалу должно быть равно 3', () => {
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 400, height: 20 },
        value: 10,
      },
      {
        position: { left: 50, top: 100 },
        size: { width: 400, height: 20 },
        value: 10,
      },
      {
        position: { left: 50, top: 100 },
        size: { width: 400, height: 20 },
        value: 10,
      },
    ];
    scale.addPoints(points);

    expect(scale['control'].querySelectorAll('.scale__point').length).toBe(3);
  });
  test('Свойство style элемента Scale должно быть изменено в соответствии с переданным в методе объектом', () => {
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 400, height: 20 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    const point: HTMLDivElement | null =
      scale['control'].querySelector('.scale__point');
    expect(point?.style.left).toBe('50px');
    expect(point?.style.top).toBe('100px');
  });
  test('Ширина элемента Scale должна быть изменена в соответствии с переданным в методе объектом', () => {
    scale = new Scale('vertical');
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 30, height: 20 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    expect(scale['control'].style.width).toBe('30px');
  });
  test('Элемент Scale должен содержать в себе элемент с классом scale__point-label', () => {
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 0, height: 0 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    expect(scale['control'].querySelector('.scale__point-label')).not.toBe(
      null
    );
  });
  test('Элемент Scale должен содержать в себе элемент с классом scale__point-marker', () => {
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 0, height: 0 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    expect(scale['control'].querySelector('.scale__point-marker')).not.toBe(
      null
    );
  });
});

describe('Метод getPointSize класса Scale', () => {
  test('Метод addPoint должен быть вызван один раз', () => {
    const spy = spyOn<any>(scale, 'addPoint');
    scale.getPointSize(10);

    expect(spy).toBeCalledTimes(1);
  });
});
