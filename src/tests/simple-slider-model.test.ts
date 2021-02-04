/* eslint-disable dot-notation */

import SimpleSliderModel from '../plugins/simple-slider/model/simple-slider-model';

let model = new SimpleSliderModel();

beforeEach(() => {
  model = new SimpleSliderModel();
});

describe('Register observer', () => {
  test('Observers must be added', () => {
    expect(model['thumbsObservers'].length).toBe(0);

    const newObserverOne = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverTwo = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverThree = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };

    model.registerObserver(newObserverOne);
    expect(model['thumbsObservers'].length).toBe(1);

    model.registerObserver(newObserverTwo);
    expect(model['thumbsObservers'].length).toBe(2);

    model.registerObserver(newObserverThree);
    expect(model['thumbsObservers'].length).toBe(3);
  });
});

describe('Remove observer', () => {
  test('Observers must be removed', () => {
    expect(model['thumbsObservers'].length).toBe(0);

    const newObserverOne = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverTwo = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };
    const newObserverThree = {
      updateThumbsPosition(): void {
        /* some operations */
      },
    };

    model.registerObserver(newObserverOne);
    model.registerObserver(newObserverTwo);
    model.registerObserver(newObserverThree);

    expect(model['thumbsObservers'].length).toBe(3);

    model.removeObserver(newObserverOne);
    expect(model['thumbsObservers'].length).toBe(2);

    model.removeObserver(newObserverTwo);
    expect(model['thumbsObservers'].length).toBe(1);

    model.removeObserver(newObserverThree);
    expect(model['thumbsObservers'].length).toBe(0);
  });
});

describe('Notify Thumbs Move Observers', () => {
  test('Observers must be notified', () => {
    let numberOfNotifiedObservers = 0;

    const newObserverOne = {
      updateThumbsPosition(): void {
        numberOfNotifiedObservers += 1;
      },
    };
    const newObserverTwo = {
      updateThumbsPosition(): void {
        numberOfNotifiedObservers += 1;
      },
    };
    const newObserverThree = {
      updateThumbsPosition(): void {
        numberOfNotifiedObservers += 1;
      },
    };

    model.registerObserver(newObserverOne);
    model['notifyThumbsMoveObservers']();
    expect(numberOfNotifiedObservers).toBe(1);

    numberOfNotifiedObservers = 0;
    model.registerObserver(newObserverTwo);
    model['notifyThumbsMoveObservers']();
    expect(numberOfNotifiedObservers).toBe(2);

    numberOfNotifiedObservers = 0;
    model.registerObserver(newObserverThree);
    model['notifyThumbsMoveObservers']();
    expect(numberOfNotifiedObservers).toBe(3);

    numberOfNotifiedObservers = 0;
    model.removeObserver(newObserverThree);
    model['notifyThumbsMoveObservers']();
    expect(numberOfNotifiedObservers).toBe(2);
  });
});

describe('Set slider size', () => {
  test('Slider width should be 5 and height should be 9', () => {
    model.setSliderSize({ width: 5, height: 9 });
    expect(model['sliderSize'].width).toBe(5);
    expect(model['sliderSize'].height).toBe(9);
  });

  test('Slider width should be 0 and height should be 12', () => {
    model.setSliderSize({ width: -1, height: 12 });
    expect(model['sliderSize'].width).toBe(0);
    expect(model['sliderSize'].height).toBe(12);
  });

  test('Slider width should be 54 and height should be 0', () => {
    model.setSliderSize({ width: 54, height: -1 });
    expect(model['sliderSize'].width).toBe(54);
    expect(model['sliderSize'].height).toBe(0);
  });

  test('Slider width should be 0 and height should be 0', () => {
    model.setSliderSize({ width: 0, height: 0 });
    expect(model['sliderSize'].width).toBe(0);
    expect(model['sliderSize'].height).toBe(0);
  });
});

describe('Set thumb size', () => {
  test('Thumb width should be 5 and height should be 9', () => {
    model.setThumbSize({ width: 5, height: 9 });
    expect(model['thumbSize'].width).toBe(5);
    expect(model['thumbSize'].height).toBe(9);
  });

  test('Thumb width should be 0 and height should be 12', () => {
    model.setThumbSize({ width: -1, height: 12 });
    expect(model['thumbSize'].width).toBe(0);
    expect(model['thumbSize'].height).toBe(12);
  });

  test('Thumb width should be 54 and height should be 0', () => {
    model.setThumbSize({ width: 54, height: -1 });
    expect(model['thumbSize'].width).toBe(54);
    expect(model['thumbSize'].height).toBe(0);
  });

  test('Thumb width should be 0 and height should be 0', () => {
    model.setThumbSize({ width: 0, height: 0 });
    expect(model['thumbSize'].width).toBe(0);
    expect(model['thumbSize'].height).toBe(0);
  });
});

describe('Thumb value to position', () => {
  test('Position left should be 0 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](-1);
    expect(position.left).toBe(0);
    expect(position.top).toBe(0);
  });

  test('Position left should be 0 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](0);
    expect(position.left).toBe(0);
    expect(position.top).toBe(0);
  });

  test('Position left should be 210 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](5);
    expect(position.left).toBe(210);
    expect(position.top).toBe(0);
  });

  test('Position left should be 420 and top should be 0', () => {
    model['sliderSize'] = { width: 440, height: 10 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](11);
    expect(position.left).toBe(420);
    expect(position.top).toBe(0);
  });

  test('Position left should be 0 and top should be 420', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 440, height: 440 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](11);
    expect(position.left).toBe(0);
    expect(position.top).toBe(420);
  });

  test('Position left should be 0 and top should be 420', () => {
    model['orientation'] = 'vertical';
    model['sliderSize'] = { width: 440, height: 440 };
    model['thumbSize'] = { width: 20, height: 20 };

    const position = model['thumbValueToPos'](7);
    expect(position.left).toBe(0);
    expect(position.top).toBeCloseTo(294);
  });
});
