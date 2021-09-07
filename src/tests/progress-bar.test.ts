/**
 * @jest-environment jsdom
 */

import ProgressBar from '../plugins/simple-slider/view/progress-bar/progress-bar';

let progressBar: ProgressBar;

beforeEach(() => {
  progressBar = new ProgressBar();
});

describe('Update', () => {
  test('progressBar left should be 10px', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar?.update(params);
    expect(progressBar?.getControl().style.left).toBe('10px');
  });
  test('progressBar top should be 5px', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar.update(params);
    expect(progressBar.getControl().style.top).toBe('5px');
  });
  test('progressBar width should be 50px', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar.update(params);
    expect(progressBar.getControl().style.width).toBe('50px');
  });
  test('progressBar height should be 30px', () => {
    const params = {
      position: { left: 10, top: 5 },
      size: { width: 50, height: 30 },
    };
    progressBar.update(params);
    expect(progressBar.getControl().style.height).toBe('30px');
  });
});
