/**
 * @jest-environment jsdom
 */
/* eslint-disable dot-notation */

import Container from '../plugins/simple-slider/view/container/container';

let container: Container;

beforeEach(() => {
  container = new Container();
});

describe('Append', () => {
  test('Container should contain element with class new-elem', () => {
    const elem = document.createElement('div');
    elem.classList.add('new-elem');
    container.append(elem);
    expect(container.getElement().querySelector('.new-elem')).not.toBeNull();
  });
  test('Container should contain element with class second-elem', () => {
    const elem = document.createElement('div');
    elem.classList.add('second-elem');
    container.append(elem);
    expect(container.getElement().querySelector('.second-elem')).not.toBeNull();
  });
});

describe('Set margins', () => {
  test('Container margins should be {left: 25, top: 77, right: 13, bottom: 2}', () => {
    container.setMargins({
      left: 25,
      top: 77,
      right: 13,
      bottom: 2,
    });

    expect(container['element'].style.marginLeft).toBe('25px');
    expect(container['element'].style.marginTop).toBe('77px');
    expect(container['element'].style.marginRight).toBe('13px');
    expect(container['element'].style.marginBottom).toBe('2px');
  });
  test('Container margins should be {left: 84, top: 97, right: 67, bottom: 73}', () => {
    container.setMargins({
      left: 84,
      top: 97,
      right: 67,
      bottom: 73,
    });

    expect(container['element'].style.marginLeft).toBe('84px');
    expect(container['element'].style.marginTop).toBe('97px');
    expect(container['element'].style.marginRight).toBe('67px');
    expect(container['element'].style.marginBottom).toBe('73px');
  });
});

describe('Reset margins', () => {
  test('Container margins should be {left: 0, top: 0, right: 0, bottom: 0}', () => {
    container.setMargins({
      left: 25,
      top: 77,
      right: 13,
      bottom: 2,
    });

    container.resetMargins();

    expect(container['element'].style.marginLeft).toBe('0');
    expect(container['element'].style.marginTop).toBe('0');
    expect(container['element'].style.marginRight).toBe('0');
    expect(container['element'].style.marginBottom).toBe('0');
  });
  test('Container margins should be {left: 0, top: 0, right: 0, bottom: 0}', () => {
    container.setMargins({
      left: 84,
      top: 97,
      right: 67,
      bottom: 73,
    });

    expect(container['element'].style.marginLeft).toBe('0');
    expect(container['element'].style.marginTop).toBe('0');
    expect(container['element'].style.marginRight).toBe('0');
    expect(container['element'].style.marginBottom).toBe('0');
  });
});
