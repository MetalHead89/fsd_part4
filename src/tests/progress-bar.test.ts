/**
 * @jest-environment jsdom
 */

import ProgressBar from '../plugins/simple-js-slider/view/progress-bar/progress-bar';

let progressBar: ProgressBar;

beforeEach(() => {
  progressBar = new ProgressBar();
});

describe('Метод Update класса ProgressBar', () => {
  test('Свойство style.left элемента ProgressBar должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar?.update(params);
    expect(progressBar?.getControl().style.left).toBe('10px');
  });
  test('Свойство style.top элемента ProgressBar должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar.update(params);
    expect(progressBar.getControl().style.top).toBe('5px');
  });
  test('Свойство style.width элемента ProgressBar должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar.update(params);
    expect(progressBar.getControl().style.width).toBe('50px');
  });
  test('Свойство style.height элемента ProgressBar должно быть изменено в соответствии с переданным в методе объектом', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar.update(params);
    expect(progressBar.getControl().style.height).toBe('30px');
  });
});
