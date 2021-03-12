/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Scale from '../plugins/simple-slider/view/scale/scale';

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
    null,
  );
};

beforeEach(() => {
  scale = new Scale();
});

describe('Click on scale', () => {
  test('SetPosition method should be called once', () => {
    const evt = document.createEvent('MouseEvent');
    const spy = spyOn<any>(scale, 'setPosition');

    initEvt(evt);
    scale['element'].dispatchEvent(evt);

    expect(spy).toBeCalledTimes(1);
  });
  test('Notify method should be called once', () => {
    const evt = document.createEvent('MouseEvent');
    const spy = spyOn<any>(scale.subject, 'notify');

    initEvt(evt);
    scale['element'].dispatchEvent(evt);

    expect(spy).toBeCalledTimes(1);
  });
  test('Scale position should be {left: 50, top: 80}', () => {
    const evt = document.createEvent('MouseEvent');
    initEvt(evt);
    scale['element'].dispatchEvent(evt);

    expect(scale.getPosition().left).toBe(50);
    expect(scale.getPosition().top).toBe(80);
  });
});

describe('Add points', () => {
  test('The number of added points should be 3', () => {
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

    expect(
      scale['element'].querySelectorAll('.slider__scale-point').length,
    ).toBe(3);
  });
  test('Scale point size should be {left: 50px, top: 100px}', () => {
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 400, height: 20 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    const point: HTMLDivElement | null = scale['element'].querySelector(
      '.slider__scale-point',
    );
    expect(point?.style.left).toBe('50px');
    expect(point?.style.top).toBe('100px');
  });
  test('Scale width should be 30px', () => {
    scale = new Scale('vertical');
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 30, height: 20 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    expect(scale['element'].style.width).toBe('30px');
  });
  test('Scale should contain an element with the slider__scale-point-label class', () => {
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 0, height: 0 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    expect(
      scale['element'].querySelector('.slider__scale-point-label'),
    ).not.toBe(null);
  });
  test('Scale should contain an element with the slider__scale-point-marker class', () => {
    const points = [
      {
        position: { left: 50, top: 100 },
        size: { width: 0, height: 0 },
        value: 10,
      },
    ];
    scale.addPoints(points);
    expect(
      scale['element'].querySelector('.slider__scale-point-marker'),
    ).not.toBe(null);
  });
});
