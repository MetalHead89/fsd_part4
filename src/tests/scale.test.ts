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
