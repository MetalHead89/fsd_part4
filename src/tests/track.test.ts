/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */

import Track from '../plugins/simple-js-slider/view/Track/Track';

let track: Track;

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
  track = new Track();
});

describe('Клик по элементу Track', () => {
  test('Метод notify должен быть вызван один раз', () => {
    const evt = document.createEvent('MouseEvent');
    const spy = spyOn<any>(track.observer, 'notify');

    initEvt(evt);
    track['control'].dispatchEvent(evt);

    expect(spy).toBeCalledTimes(1);
  });
  test('Позиция элемента Track должна соответствовать позиции из события MouseEvent', () => {
    const evt = document.createEvent('MouseEvent');
    initEvt(evt);
    track['control'].dispatchEvent(evt);

    expect(track.getPosition().left).toBe(50);
    expect(track.getPosition().top).toBe(80);
  });
});
