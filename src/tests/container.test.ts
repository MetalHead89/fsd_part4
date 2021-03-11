/**
 * @jest-environment jsdom
 */

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
