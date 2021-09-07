/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */

import Track from '../plugins/simple-slider/view/track/track';

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

describe('Click on track', () => {
  test('SetPosition method should be called once', () => {
    const evt = document.createEvent('MouseEvent');
    const spy = spyOn<any>(track, 'setPosition');

    initEvt(evt);
    track['control'].dispatchEvent(evt);

    expect(spy).toBeCalledTimes(1);
  });
  test('Notify method should be called once', () => {
    const evt = document.createEvent('MouseEvent');
    const spy = spyOn<any>(track.subject, 'notify');

    initEvt(evt);
    track['control'].dispatchEvent(evt);

    expect(spy).toBeCalledTimes(1);
  });
  test('Position should be {left: 50, top: 80}', () => {
    const evt = document.createEvent('MouseEvent');
    initEvt(evt);
    track['control'].dispatchEvent(evt);

    expect(track.getPosition().left).toBe(50);
    expect(track.getPosition().top).toBe(80);
  });
});
