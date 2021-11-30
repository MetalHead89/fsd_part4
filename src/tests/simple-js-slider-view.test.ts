/**
 * @jest-environment jsdom
 */

/* eslint-disable comma-dangle */
/* eslint-disable dot-notation */
/* eslint-disable no-return-assign */

import SimpleJsSliderView from '../plugins/simple-js-slider/view/SimpleJsSliderView';
import Slider from '../plugins/simple-js-slider/view/Slider/Slider';

let wrapper: HTMLDivElement;
let view: SimpleJsSliderView;

beforeEach(() => {
  wrapper = document.createElement('div');
  view = new SimpleJsSliderView(wrapper);
});

describe('Метод moveThumbs класса SimpleJsSliderView', () => {
  test('Метод moveTo класса Thumb должен быть вызван один раз', () => {
    view['slider'].getOrientation = jest.fn().mockReturnValueOnce('vertical');
    const thumbsParams = {
      thumbOne: { position: 15, value: 30 },
      thumbTwo: { position: 28, value: 30 },
    };

    const spy = spyOn(view['thumbOne'], 'moveTo');
    view.moveThumbs({ ...thumbsParams });

    expect(spy).toBeCalledTimes(1);
  });

  test('Метод moveTo класса Thumb должен быть вызван один раз', () => {
    const thumbsParams = {
      thumbOne: { position: 15, value: 30 },
      thumbTwo: { position: 10, value: 30 },
    };

    const spy = spyOn(view['thumbTwo'], 'moveTo');
    view.moveThumbs({ ...thumbsParams });

    expect(spy).toBeCalledTimes(1);
  });

  test('Метод swapThumbs класса Thumb должен быть вызван 1 раз', () => {
    const thumbsParams = {
      thumbOne: { position: 15, value: 30 },
      thumbTwo: { position: 10, value: 30 },
    };

    const spy = spyOn(view, 'swapThumbs');
    view.moveThumbs({ ...thumbsParams });

    expect(spy).toBeCalledTimes(1);
  });

  test('Метод swapThumbs класса Thumb не должен быть вызван', () => {
    const thumbsParams = {
      thumbOne: { position: 15, value: 30 },
      thumbTwo: { position: 28, value: 30 },
    };
    view['thumbTwo'] = null;

    const spy = spyOn(view, 'swapThumbs');
    view.moveThumbs({ ...thumbsParams });

    expect(spy).toBeCalledTimes(0);
  });
});

describe('Метод updatePopUps класса SimpleJsSliderView', () => {
  test('Метод update класса PopUp должен быть вызван один раз', () => {
    const thumbsParams = {
      thumbOne: 50,
      thumbTwo: 50,
    };

    const spy = spyOn(view['popUpOne'], 'update');
    view.updatePopUps({ ...thumbsParams });

    expect(spy).toBeCalledTimes(1);
  });

  test('Метод update класса PopUp не должен быть вызван', () => {
    const thumbsParams = {
      thumbOne: 50,
      thumbTwo: 50,
    };
    view['thumbOne'] = null;

    const spy = spyOn(view['popUpOne'], 'update');
    view.updatePopUps({ ...thumbsParams });

    expect(spy).toBeCalledTimes(0);
  });
});

describe('Метод updateProgressBar класса SimpleJsSliderView', () => {
  test('Метод update класса ProgressBar должен быть вызван один раз', () => {
    const spy = spyOn(view['progressBar'], 'update');
    view.updateProgressBar();

    expect(spy).toBeCalledTimes(1);
  });

  test('Метод update класса ProgressBar должен быть вызван один раз', () => {
    view.switchToHorizontal();
    view['thumbTwo'] = null;
    const spy = spyOn(view['progressBar'], 'update');
    view.updateProgressBar();

    expect(spy).toBeCalledTimes(1);
  });

  test('Метод update класса ProgressBar должен быть вызван один раз', () => {
    view.switchToVertical();
    const spy = spyOn(view['progressBar'], 'update');
    view.updateProgressBar();

    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод updateScale класса SimpleJsSliderView', () => {
  test('Метод setMargins класса Slider должен быть вызван несколько раз', () => {
    const pointsParams = [{ value: 20, position: 30 }];

    const spy = spyOn(view['slider'], 'setMargins');
    view.updateScale(pointsParams);

    expect(spy).toBeCalled();
  });

  test('Метод setMargins класса Slider не должен быть вызван', () => {
    const pointsParams = [{ value: 20, position: 30 }];
    view['scale'] = null;

    const spy = spyOn(view['slider'], 'setMargins');
    view.updateScale(pointsParams);

    expect(spy).not.toBeCalled();
  });
});

describe('Метод switchToSingle класса SimpleJsSliderView', () => {
  test('ThumbTwo должен быть null', () => {
    view.switchToSingle();

    expect(view['thumbTwo']).toBeNull();
  });
});

describe('Метод switchToRange класса SimpleJsSliderView', () => {
  test('ThumbTwo должен существовать', () => {
    view.switchToSingle();
    view.switchToRange();

    expect(view['thumbTwo']).not.toBeNull();
  });

  test('ThumbTwo должен существовать', () => {
    view.switchToRange();

    expect(view['thumbTwo']).not.toBeNull();
  });

  test('ThumbTwo должен существовать', () => {
    view['thumbTwo'] = null;
    view['popUpOne'] = null;
    view.switchToRange();

    expect(view['thumbTwo']).not.toBeNull();
  });
});

describe('Метод disablePopUps класса SimpleJsSliderView', () => {
  test('PopUps должны быть отключены', () => {
    view.disablePopUps();

    expect(view['popUpOne']).toBeNull();
    expect(view['popUpTwo']).toBeNull();
  });
});

describe('Метод enablePopUps класса SimpleJsSliderView', () => {
  test('PopUps должны существовать', () => {
    view.disablePopUps();
    view.enablePopUps();

    expect(view['popUpOne']).not.toBeNull();
    expect(view['popUpTwo']).not.toBeNull();
  });

  test('PopUps должны существовать', () => {
    view.enablePopUps();

    expect(view['popUpOne']).not.toBeNull();
    expect(view['popUpTwo']).not.toBeNull();
  });
});

describe('Метод enableScale класса SimpleJsSliderView', () => {
  test('Scale должна существовать', () => {
    view.enableScale();

    expect(view['scale']).not.toBeNull();
  });

  test('Scale должна существовать', () => {
    view['scale'] = null;
    view.enableScale();

    expect(view['scale']).not.toBeNull();
  });
});

describe('Метод getThumbSize класса SimpleJsSliderView', () => {
  test('Метод getThumbSize должен возвратить объект с размерами Thumb', () => {
    expect(view.getThumbSize().height).toBe(0);
  });
});

describe('Метод getSliderSize класса SimpleJsSliderView', () => {
  test('Метод getSliderSize должен возвратить объект с размерами Slider', () => {
    expect(view.getSliderSize().height).toBe(0);
  });
});

describe('Метод getThumbsPositions класса SimpleJsSliderView', () => {
  test('Метод getThumbsPositions класса Thumb должен быть вызван один раз', () => {
    const spy = spyOn(view['thumbOne'], 'getPosition');
    view.getThumbsPositions();

    expect(spy).toBeCalledTimes(1);
  });

  test('Позиция thumbTwo должна быть null', () => {
    view['thumbTwo'] = null;

    expect(view.getThumbsPositions().thumbTwo).toBeNull();
  });
});

describe('Метод updateThumbs класса SimpleJsSliderView', () => {
  test('Метод moveTo класса Thumb должен быть вызван один раз', () => {
    const thumbsParams = {
      thumbOne: { left: 100, top: 50 },
      thumbTwo: { left: 100, top: 50 },
    };

    const spy = spyOn(view['thumbOne'], 'moveTo');
    view.updateThumbs(thumbsParams);

    expect(spy).toBeCalledTimes(1);
  });

  test('Метод moveTo класса Thumb не должен быть вызван', () => {
    const thumbsParams = {
      thumbOne: { left: 100, top: 50 },
      thumbTwo: null,
    };

    const spy = spyOn(view['thumbTwo'], 'moveTo');
    view.updateThumbs(thumbsParams);

    expect(spy).toBeCalledTimes(0);
  });
});

describe('Метод getTrackClickPosition класса SimpleJsSliderView', () => {
  test('Метод должен возвращать объект с позицией', () => {
    expect(view.getTrackClickPosition().top).toBe(0);
    expect(view.getTrackClickPosition().left).toBe(0);
  });
});

describe('Метод getScaleClickPosition класса SimpleJsSliderView', () => {
  test('Метод должен возвращать объект с позицией', () => {
    expect(view.getScaleClickPosition().top).toBe(0);
    expect(view.getScaleClickPosition().left).toBe(0);
  });

  test('Метод должен возвращать объект с позицией', () => {
    view['scale'] = null;
    expect(view.getScaleClickPosition().top).toBe(0);
    expect(view.getScaleClickPosition().left).toBe(0);
  });
});

describe('Метод updateThumbsPositions класса SimpleJsSliderView', () => {
  test('Метод getThumbsPercentPositions должен быть вызван один раз', () => {
    const spy = spyOn(view, 'notifyAboutThumbsDragged');
    view['getThumbsPercentPositions'] = jest
      .fn()
      .mockReturnValueOnce({ thumbOne: 20, thumbTwo: 13 });

    view['updateThumbsPositions']();
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод getThumbsPercentPositions класса SimpleJsSliderView', () => {
  test('Метод calculateThumbPercentPosition должен быть вызван два раза', () => {
    const spy = spyOn(view, 'calculateThumbPercentPosition');
    view['getThumbsPercentPositions']();
    expect(spy).toBeCalledTimes(2);
  });

  test('Должен воозвратить объект, в котором thumbTwo равно null', () => {
    view['thumbTwo'] = null;
    expect(view['getThumbsPercentPositions']().thumbTwo).toBeNull;
  });
});

describe('Метод notifyAboutThumbsDragged класса SimpleJsSliderView', () => {
  test('Метод должен оповещать observer о передвижении Thumbs', () => {
    let notifyCounter = 0;
    view.observer.register('thumbIsDragged', () => (notifyCounter += 1));
    view['notifyAboutThumbsDragged'](20, 30);
    expect(notifyCounter).toBe(1);
  });
});

describe('Метод setThumbPositionOnClickPosition класса SimpleJsSliderView', () => {
  test('Метод notifyAboutThumbsDragged должен быть вызван один раз', () => {
    const spy = spyOn(view, 'notifyAboutThumbsDragged');
    view['setThumbPositionOnClickPosition']({ left: 20, top: 30 });
    expect(spy).toBeCalledTimes(1);
  });

  test('Метод notifyAboutThumbsDragged должен быть вызван один раз', () => {
    view['thumbOne'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 10, top: 10 });
    view['thumbTwo'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 100, top: 100 });

    view['setThumbPositionOnClickPosition']({ left: 90, top: 90 });

    const spy = spyOn(view, 'notifyAboutThumbsDragged');
    view['setThumbPositionOnClickPosition']({ left: 20, top: 30 });
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Метод thumbTwoIsNearToClick класса SimpleJsSliderView', () => {
  test('ThumbOne должен быть ближе к месту клика', () => {
    view['thumbOne'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 10, top: 10 });
    view['thumbTwo'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 100, top: 100 });

    expect(view['thumbTwoIsNearToClick']({ left: 15, top: 15 })).toBe(false);
  });

  test('ThumbOne должен быть ближе к месту клика', () => {
    view['thumbOne'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 10, top: 10 });
    view['thumbTwo'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 100, top: 100 });
    view['thumbTwo'] = null;

    expect(view['thumbTwoIsNearToClick']({ left: 90, top: 90 })).toBe(false);
  });

  test('ThumbTwo должен быть ближе к месту клика', () => {
    view['thumbOne'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 10, top: 10 });
    view['thumbTwo'].getPosition = jest
      .fn()
      .mockReturnValue({ left: 100, top: 100 });

    expect(view['thumbTwoIsNearToClick']({ left: 90, top: 90 })).toBe(true);
  });
});

describe('Метод calculateThumbPercentPosition класса SimpleJsSliderView', () => {
  test('Должна корректно вычисляться позиция Thumb', () => {
    view['slider'].getSize = jest
      .fn()
      .mockReturnValue({ width: 250, height: 10 });

    expect(
      view['calculateThumbPercentPosition'](
        { top: 0, left: 15 },
        { width: 20, height: 20 }
      )
    ).toBeCloseTo(6.521);
  });

  test('Должна корректно вычисляться позиция Thumb', () => {
    view['slider'].getSize = jest
      .fn()
      .mockReturnValue({ width: 250, height: 10 });

    expect(
      view['calculateThumbPercentPosition'](
        { top: 0, left: -20 },
        { width: 20, height: 20 }
      )
    ).toBeCloseTo(0);
  });
});

describe('Метод swapThumbs класса SimpleJsSliderView', () => {
  test('Thumbs должны поменяться местами', () => {
    const copyThumbOne = view['thumbOne'];
    const copyThumbTwo = view['thumbTwo'];

    view['swapThumbs']();

    expect(copyThumbOne === view['thumbTwo']).toBe(true);
    expect(copyThumbTwo === view['thumbOne']).toBe(true);
  });

  test('Thumbs не должны поменяться местами', () => {
    view['thumbTwo'] = null;
    const copyThumbOne = view['thumbOne'];
    const copyThumbTwo = view['thumbTwo'];

    view['swapThumbs']();

    expect(copyThumbOne === view['thumbTwo']).toBe(false);
    expect(copyThumbTwo === view['thumbOne']).toBe(false);
  });
});

describe('Метод getVisiblePoints класса SimpleJsSliderView', () => {
  test('Должны возвращаться видимые точки шкалы', () => {
    const pointsParams = [
      { position: 0, value: 0 },
      { position: 10, value: 1 },
      { position: 20, value: 2 },
      { position: 30, value: 3 },
      { position: 40, value: 4 },
      { position: 50, value: 5 },
      { position: 60, value: 6 },
      { position: 70, value: 7 },
      { position: 80, value: 8 },
      { position: 90, value: 9 },
      { position: 100, value: 10 },
    ];
    view['slider'].getSize = jest
      .fn()
      .mockReturnValue({ width: 250, height: 10 });

    expect(view['getVisiblePoints'](pointsParams, 50).length).toBe(3);
  });
});

describe('Метод assembleSlider класса SimpleJsSliderView', () => {
  test('Метод append должен вызываться правильное число раз', () => {
    const spy = spyOn(view['slider'], 'append');
    view['assembleSlider']();
    expect(spy).toBeCalledTimes(7);
  });

  test('Метод append должен вызываться правильное число раз', () => {
    view['thumbTwo'] = null;
    const spy = spyOn(view['slider'], 'append');
    view['assembleSlider']();
    expect(spy).toBeCalledTimes(6);
  });

  test('Метод append должен вызываться правильное число раз', () => {
    view['popUpOne'] = null;
    const spy = spyOn(view['slider'], 'append');
    view['assembleSlider']();
    expect(spy).toBeCalledTimes(6);
  });

  test('Метод append должен вызываться правильное число раз', () => {
    view['popUpTwo'] = null;
    const spy = spyOn(view['slider'], 'append');
    view['assembleSlider']();
    expect(spy).toBeCalledTimes(6);
  });

  test('Метод append должен вызываться правильное число раз', () => {
    view['scale'] = null;
    const spy = spyOn(view['slider'], 'append');
    view['assembleSlider']();
    expect(spy).toBeCalledTimes(6);
  });
});

describe('Метод getMargins класса SimpleJsSliderView', () => {
  test('Отступы должны корректно вычисляться', () => {
    view['slider'].getRect = jest
      .fn()
      .mockReturnValue({ top: 30, right: 10, bottom: 10, left: 30 });

    view['popUpOne'].getRect = jest
      .fn()
      .mockReturnValue({ top: 5, right: 10, bottom: 60, left: 5 });

    view['scale'].getRect = jest
      .fn()
      .mockReturnValue({ top: 10, right: 10, bottom: 64, left: 10 });

    expect(view['getMargins']().top).toBe(25);
    expect(view['getMargins']().bottom).toBe(54);
  });

  test('Отступы должны корректно вычисляться', () => {
    view.switchToVertical();
    view['slider'].getRect = jest
      .fn()
      .mockReturnValue({ top: 30, right: 10, bottom: 10, left: 30 });

    view['popUpOne'].getRect = jest
      .fn()
      .mockReturnValue({ top: 5, right: 10, bottom: 60, left: 5 });

    view['scale'].getRect = jest
      .fn()
      .mockReturnValue({ top: 10, right: 70, bottom: 64, left: 10 });

    expect(view['getMargins']().left).toBe(25);
    expect(view['getMargins']().right).toBe(60);
  });

  test('Отступы должны корректно вычисляться', () => {
    view.switchToVertical();
    view['slider'].getRect = jest
      .fn()
      .mockReturnValue({ top: 30, right: 10, bottom: 10, left: 30 });

    view['popUpOne'].getRect = jest
      .fn()
      .mockReturnValue({ top: 5, right: 10, bottom: 60, left: 5 });

    view['scale'].getRect = jest
      .fn()
      .mockReturnValue({ top: 10, right: 70, bottom: 64, left: 10 });

    view['popUpOne'] = null;
    view['scale'] = null;

    expect(view['getMargins']().left).toBe(0);
    expect(view['getMargins']().right).toBe(0);
  });
});

describe('Реакция на событие clickToScale', () => {
  test('Должен вызваться метод setThumbPositionOnClickPosition', () => {
    const spy = spyOn(view, 'setThumbPositionOnClickPosition');
    view['scale'].observer.notify('clickToScale', { left: 50, top: 50 });
    expect(spy).toBeCalledTimes(1);
  });

  test('Должен вызваться метод setThumbPositionOnClickPosition', () => {
    const spy = spyOn(view, 'setThumbPositionOnClickPosition');
    view.disableScale();
    view.enableScale();
    view['scale'].observer.notify('clickToScale', { left: 50, top: 50 });
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Реакция на событие clickToTrack', () => {
  test('Должен вызваться метод setThumbPositionOnClickPosition', () => {
    const spy = spyOn(view, 'setThumbPositionOnClickPosition');
    view['track'].observer.notify('clickToTrack', { left: 50, top: 50 });
    expect(spy).toBeCalledTimes(1);
  });
});

// /**
//  * @jest-environment jsdom
//  */

// /* eslint-disable dot-notation */
// /* eslint-disable arrow-body-style */
// /* eslint-disable comma-dangle */

// import SimpleJsSliderView from '../plugins/simple-js-slider/view/SimpleJsSliderView';

// jest.mock('../plugins/simple-js-slider/view/slider/slider');
// jest.mock('../plugins/simple-js-slider/view/track/track');
// jest.mock('../plugins/simple-js-slider/view/thumb/thumb');
// jest.mock('../plugins/simple-js-slider/view/pop-up/pop-up');
// jest.mock('../plugins/simple-js-slider/view/progress-bar/progress-bar');
// jest.mock('../plugins/simple-js-slider/view/scale/scale');

// let wrapper: HTMLDivElement;
// let view: SimpleJsSliderView;

// beforeEach(() => {
//   wrapper = document.createElement('div');
//   view = new SimpleJsSliderView(wrapper);
// });

// describe('Событие windowResized из класса SimpleJsSliderView', () => {
//   test('Метод notify должен быть вызван один раз', () => {
//     const spy = spyOn(view.subject, 'notify');
//     const evt = new window.Event('resize');
//     window.dispatchEvent(evt);
//     expect(spy).toBeCalledTimes(1);
//   });
// });

// describe('Метод assembleSlider из класса SimpleJsSliderView', () => {
//   test('Wrapper должен содержать элемент с классом slider', () => {
//     expect(wrapper.querySelector('.slider')).not.toBeNull();
//   });
//   test('Wrapper должен содержать элемент с классом slider__track', () => {
//     expect(wrapper.querySelector('.slider__track')).not.toBeNull();
//   });
//   test('Wrapper должен содержать элемент с классом slider__thumb', () => {
//     expect(wrapper.querySelector('.slider__thumb')).not.toBeNull();
//   });
//   test('Wrapper должен содержать элемент с классом slider__pop-up', () => {
//     expect(wrapper.querySelector('.slider__pop-up')).not.toBeNull();
//   });
//   test('Wrapper должен содержать элемент с классом slider__progress', () => {
//     expect(wrapper.querySelector('.slider__progress-bar')).not.toBeNull();
//   });
//   test('Wrapper должен содержать элемент с классом slider__scale', () => {
//     expect(wrapper.querySelector('.slider__scale')).not.toBeNull();
//   });
//   test('Wrapper должен содержать элемент с классом slider', () => {
//     view['slider'].remove();
//     view['thumbTwo'] = null;
//     view['popUpOne'] = null;
//     view['popUpTwo'] = null;
//     view['scale'] = null;
//     view['assembleSlider']();
//     expect(wrapper.querySelector('.slider')).not.toBeNull();
//   });
// });

// describe('Метод update из класса SimpleJsSliderView', () => {
//   test('Оповещение о событии thumbIsDragged должно сработать один раз', () => {
//     const spy = spyOn(view.subject, 'notify');
//     view.update('thumbIsDragged');
//     expect(spy).toBeCalledTimes(1);
//   });
//   test('Метод notify не должен быть вызван', () => {
//     const spy = spyOn(view.subject, 'notify');
//     view.update('emptyEvent');
//     expect(spy).toBeCalledTimes(0);
//   });
//   test('Оповещение о событии clickToTrack должно сработать один раз', () => {
//     const spy = spyOn(view.subject, 'notify');
//     view.update('clickToTrack');
//     expect(spy).toBeCalledTimes(1);
//   });
//   test('Оповещение о событии clickToScale должно сработать один раз', () => {
//     const spy = spyOn(view.subject, 'notify');
//     view.update('clickToScale');
//     expect(spy).toBeCalledTimes(1);
//   });
// });

// describe('Метод switchToHorizontal из класса SimpleJsSliderView', () => {
//   test('Слайдер должен содержать элемент с классом slider_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['slider'].getControl().classList.contains('slider_orientation_horizontal')
//     ).toBe(true);
//   });
//   test('Track должен содержать элемент с классом slider__track_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['track'].getControl().classList.contains('slider__track_orientation_horizontal')
//     ).toBe(true);
//   });
//   test('ThumbOne должен содержать элемент с классом slider__thumb_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['thumbOne']
//         .getControl()
//         .classList.contains('slider__thumb_orientation_horizontal')
//     ).toBe(true);
//   });
//   test('ThumbTwo должен содержать элемент с классом slider__thumb_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['thumbTwo']
//         ?.getControl()
//         .classList.contains('slider__thumb_orientation_horizontal')
//     ).toBe(true);
//   });
//   test('PopUpOne должен содержать элемент с классом slider__pop-up_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['popUpOne']
//         ?.getControl()
//         .classList.contains('slider__pop-up_orientation_horizontal')
//     ).toBe(true);
//   });
//   test('PopUpTwo должен содержать элемент с классом slider__pop-up_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['popUpTwo']
//         ?.getControl()
//         .classList.contains('slider__pop-up_orientation_horizontal')
//     ).toBe(true);
//   });
//   test('ProgressBar должен содержать элемент с классом slider__progress-bar_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['progressBar']
//         .getControl()
//         .classList.contains('slider__progress-bar_orientation_horizontal')
//     ).toBe(true);
//   });
//   test('Scale должен содержать элемент с классом slider__scale_orientation_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['scale']?.getControl().classList.contains('slider__scale_orientation_horizontal')
//     ).toBe(true);
//   });
// });

// describe('Метод switchToVertical из класса SimpleJsSliderView', () => {
//   test('Слайдер должен содержать элемент с классом slider_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['slider'].getControl().classList.contains('slider_orientation_vertical')
//     ).toBe(true);
//   });
//   test('Track должен содержать элемент с классом slider__track_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['track'].getControl().classList.contains('slider__track_orientation_vertical')
//     ).toBe(true);
//   });
//   test('ThumbOne должен содержать элемент с классом slider__thumb_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['thumbOne'].getControl().classList.contains('slider__thumb_orientation_vertical')
//     ).toBe(true);
//   });
//   test('ThumbTwo должен содержать элемент с классом slider__thumb_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['thumbTwo']
//         ?.getControl()
//         .classList.contains('slider__thumb_orientation_vertical')
//     ).toBe(true);
//   });
//   test('PopUpOne должен содержать элемент с классом slider__pop-up_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['popUpOne']
//         ?.getControl()
//         .classList.contains('slider__pop-up_orientation_vertical')
//     ).toBe(true);
//   });
//   test('PopUpTwo должен содержать элемент с классом slider__pop-up_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['popUpTwo']
//         ?.getControl()
//         .classList.contains('slider__pop-up_orientation_vertical')
//     ).toBe(true);
//   });
//   test('ProgressBar должен содержать элемент с классом slider__progress-bar_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['progressBar']
//         .getControl()
//         .classList.contains('slider__progress-bar_orientation_vertical')
//     ).toBe(true);
//   });
//   test('Scale должен содержать элемент с классом slider__scale_orientation_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['scale']?.getControl().classList.contains('slider__scale_orientation_vertical')
//     ).toBe(true);
//   });
// });

// describe('Метод switchToSingle из класса SimpleJsSliderView', () => {
//   test('ThumbTwo должна быть null', () => {
//     view.switchToSingle();
//     expect(view['thumbTwo']).toBeNull();
//   });
// });

// describe('Метод switchToRange из класса SimpleJsSliderView', () => {
//   test('ThumbTwo не должна быть null', () => {
//     view.switchToRange();
//     expect(view['thumbTwo']).not.toBeNull();
//   });
//   test('ThumbTwo не должна быть null', () => {
//     view.switchToSingle();
//     view.switchToRange();
//     expect(view['thumbTwo']).not.toBeNull();
//   });
//   test('ThumbTwo не должна быть null, а popUpTwo должна быть null', () => {
//     view.switchToSingle();
//     view['popUpOne'] = null;
//     view.switchToRange();
//     expect(view['thumbTwo']).not.toBeNull();
//     expect(view['popUpTwo']).toBeNull();
//   });
// });

// describe('Метод disablePopUps из класса SimpleJsSliderView', () => {
//   test('PopUpOne должна быть null', () => {
//     view.disablePopUps();
//     expect(view['popUpOne']).toBeNull();
//   });
//   test('PopUpTwo должна быть null', () => {
//     view.switchToRange();
//     view.disablePopUps();
//     expect(view['popUpTwo']).toBeNull();
//   });
// });

// describe('Метод enablePopUps из класса SimpleJsSliderView', () => {
//   test('PopUpOne не должна быть null', () => {
//     view.disablePopUps();
//     view.enablePopUps();
//     expect(view['popUpOne']).toBeDefined();
//   });
//   test('PopUpTwo должна быть null', () => {
//     view.switchToSingle();
//     view.enablePopUps();
//     expect(view['popUpTwo']).toBeNull();
//   });
//   test('PopUpTwo не должна быть null', () => {
//     view.switchToSingle();
//     view.switchToRange();
//     view.disablePopUps();
//     view.enablePopUps();
//     expect(view['popUpTwo']).toBeDefined();
//   });
// });

// describe('Метод disableScale из класса SimpleJsSliderView', () => {
//   test('Scale должна быть отключена', () => {
//     view.disableScale();
//     expect(view['scale']).toBeNull();
//   });
//   test('Scale должна быть отключена', () => {
//     view.enableScale();
//     view.disableScale();
//     expect(view['scale']).toBeNull();
//   });
// });

// describe('Метод enableScale из класса SimpleJsSliderView', () => {
//   test('Scale должна быть включена', () => {
//     view.enableScale();
//     view.enableScale();
//     expect(view['scale']).toBeDefined();
//   });
//   test('Scale должна быть включена', () => {
//     view.disableScale();
//     view.enableScale();
//     expect(view['scale']).toBeDefined();
//   });
// });

// describe('Метод getThumbSize из класса SimpleJsSliderView', () => {
//   test('Метод должен возвратить true', () => {
//     expect(view.getThumbSize()).toBe(true);
//   });
// });

// describe('Метод getSliderSize из класса SimpleJsSliderView', () => {
//   test('Метод должен возвратить true', () => {
//     expect(view.getSliderSize()).toBe(true);
//   });
// });

// describe('Метод getThumbsPositions из класса SimpleJsSliderView', () => {
//   test('Метод должен возвратить объект в котором ThumbOne true', () => {
//     expect(view.getThumbsPositions().thumbOne).toBe(true);
//   });
//   test('Метод должен возвратить объект в котором ThumbTwo true', () => {
//     expect(view.getThumbsPositions().thumbTwo).toBe(true);
//   });
//   test('Метод должен возвратить объект в котором ThumbOne true', () => {
//     view.switchToSingle();
//     expect(view.getThumbsPositions().thumbOne).toBe(true);
//   });
//   test('Метод должен возвратить объект в котором ThumbTwo равен null', () => {
//     view.switchToSingle();
//     expect(view.getThumbsPositions().thumbTwo).toBe(null);
//   });
// });

// describe('Метод updateThumbs из класса SimpleJsSliderView', () => {
//   test('Метод moveTo объекта thumbOne должен быть вызван один раз', () => {
//     const spy = spyOn(view['thumbOne'], 'moveTo');
//     view.updateThumbs({
//       thumbOne: { left: 0, top: 0 },
//       thumbTwo: { left: 0, top: 0 },
//     });
//     expect(spy).toBeCalledTimes(1);
//   });
//   test('Метод moveTo объекта thumbTwo не должен быть вызван', () => {
//     if (view['thumbTwo'] !== null) {
//       const spy = spyOn(view['thumbTwo'], 'moveTo');
//       view.updateThumbs({
//         thumbOne: { left: 0, top: 0 },
//         thumbTwo: null,
//       });
//       expect(spy).toBeCalledTimes(0);
//     }
//   });
//   test('Метод moveTo объекта thumbOne должен быть вызван два раза', () => {
//     if (view['thumbTwo'] !== null) {
//       const spy = spyOn(view['thumbTwo'], 'moveTo');
//       view.updateThumbs({
//         thumbOne: { left: 0, top: 0 },
//         thumbTwo: { left: 0, top: 0 },
//       });
//       view.updateThumbs({
//         thumbOne: { left: 0, top: 0 },
//         thumbTwo: { left: 0, top: 0 },
//       });
//       expect(spy).toBeCalledTimes(2);
//     }
//   });
// });

// describe('Метод updateProgressBar из класса SimpleJsSliderView', () => {
//   test('Метод update должен быть вызван один раз', () => {
//     const spy = spyOn(view['progressBar'], 'update');
//     view.updateProgressBar({
//       position: { left: 0, top: 0 },
//       size: { width: 0, height: 0 },
//     });
//     expect(spy).toBeCalledTimes(1);
//   });
//   test('Метод update должен быть вызван два раза', () => {
//     const spy = spyOn(view['progressBar'], 'update');
//     view.updateProgressBar({
//       position: { left: 0, top: 0 },
//       size: { width: 0, height: 0 },
//     });
//     view.updateProgressBar({
//       position: { left: 0, top: 0 },
//       size: { width: 0, height: 0 },
//     });
//     expect(spy).toBeCalledTimes(2);
//   });
// });

// describe('Метод updatePopUps из класса SimpleJsSliderView', () => {
//   test('Метод update должен быть вызван один раз', () => {
//     let spy;
//     if (view['popUpOne'] !== null) {
//       spy = spyOn(view['popUpOne'], 'update');
//     }
//     view.updatePopUps({
//       popUpOne: { value: 0, position: { left: 0, top: 0 } },
//       popUpTwo: { value: 0, position: { left: 0, top: 0 } },
//     });
//     expect(spy).toBeCalledTimes(1);
//   });
//   test('Метод update должен быть вызван два раза', () => {
//     let spy;
//     if (view['popUpTwo'] !== null) {
//       spy = spyOn(view['popUpTwo'], 'update');
//     }
//     view.updatePopUps({
//       popUpOne: { value: 0, position: { left: 0, top: 0 } },
//       popUpTwo: { value: 0, position: { left: 0, top: 0 } },
//     });
//     view.updatePopUps({
//       popUpOne: { value: 0, position: { left: 0, top: 0 } },
//       popUpTwo: { value: 0, position: { left: 0, top: 0 } },
//     });
//     expect(spy).toBeCalledTimes(2);
//   });
//   test('Метод update не должен быть вызван', () => {
//     let spy1;
//     let spy2;
//     view.disablePopUps();
//     if (view['popUpOne'] !== null) {
//       spy1 = spyOn(view['popUpOne'], 'update');
//     }
//     if (view['popUpTwo'] !== null) {
//       spy2 = spyOn(view['popUpTwo'], 'update');
//     }
//     view.updatePopUps({
//       popUpOne: { value: 0, position: { left: 0, top: 0 } },
//       popUpTwo: { value: 0, position: { left: 0, top: 0 } },
//     });
//     expect(spy1).toBeUndefined();
//     expect(spy2).toBeUndefined();
//   });
// });

// describe('Метод getScalePointSize из класса SimpleJsSliderView', () => {
//   test('Должен быть возвращен объект с размерами scalePoint', () => {
//     view.disableScale();
//     expect(view.getScalePointSize(10).width).toBe(0);
//     expect(view.getScalePointSize(10).height).toBe(0);
//   });
//   test('Должен быть возвращен объект с размерами scalePoint', () => {
//     expect(view.getScalePointSize(10)).toBe(true);
//   });
// });

// describe('Метод addScalePoints из класса SimpleJsSliderView', () => {
//   test('Должны добавляться scalePoints', () => {
//     view.addScalePoints([
//       {
//         position: { left: 0, top: 0 },
//         size: { width: 0, height: 0 },
//         value: 0,
//       },
//       {
//         position: { left: 0, top: 0 },
//         size: { width: 0, height: 0 },
//         value: 0,
//       },
//     ]);
//     expect(
//       view['scale']?.getControl().querySelectorAll('.scale-point').length
//     ).toBe(2);
//   });
//   test('Должны добавляться scalePoints', () => {
//     view.addScalePoints([
//       {
//         position: { left: 0, top: 0 },
//         size: { width: 0, height: 0 },
//         value: 0,
//       },
//       {
//         position: { left: 0, top: 0 },
//         size: { width: 0, height: 0 },
//         value: 0,
//       },
//       {
//         position: { left: 0, top: 0 },
//         size: { width: 0, height: 0 },
//         value: 0,
//       },
//     ]);
//     expect(
//       view['scale']?.getControl().querySelectorAll('.scale-point').length
//     ).toBe(3);
//   });
// });

// describe('Метод getTrackClickPosition из класса SimpleJsSliderView', () => {
//   test('Метод должен вернуть true', () => {
//     expect(view.getTrackClickPosition()).toBe(true);
//   });
// });

// describe('Метод getScaleClickPosition из класса SimpleJsSliderView', () => {
//   test('Метод должен вернуть true', () => {
//     expect(view.getScaleClickPosition()).toBe(true);
//   });
//   test('Метод должен вернуть объект свойства которого равны 0', () => {
//     view.disableScale();
//     expect(view.getScaleClickPosition().left).toBe(0);
//     expect(view.getScaleClickPosition().top).toBe(0);
//   });
// });

// describe('Метод getMargins из класса SimpleJsSliderView', () => {
//   beforeEach(() => {
//     view['slider'].getRect = jest.fn(() => {
//       return {
//         width: 120,
//         height: 120,
//         top: 25,
//         left: 49,
//         bottom: 60,
//         right: 5,
//         x: 35,
//         y: 48,
//         toJSON: () => null,
//       };
//     });

//     if (view['scale'] !== null) {
//       view['scale'].getRect = jest.fn(() => {
//         return {
//           width: 120,
//           height: 120,
//           top: 11,
//           left: 49,
//           bottom: 87,
//           right: 45,
//           x: 35,
//           y: 48,
//           toJSON: () => null,
//         };
//       });
//     }

//     if (view['popUpOne'] !== null) {
//       view['popUpOne'].getRect = jest.fn(() => {
//         return {
//           width: 120,
//           height: 120,
//           top: 13,
//           left: 21,
//           bottom: 87,
//           right: 5,
//           x: 35,
//           y: 48,
//           toJSON: () => null,
//         };
//       });
//     }
//   });

//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'horizontal');
//     expect(view['getMargins']().bottom).toBe(27);
//   });
//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'horizontal');
//     view.disableScale();
//     expect(view['getMargins']().bottom).toBe(0);
//   });
//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'horizontal');
//     expect(view['getMargins']().top).toBe(12);
//   });
//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'horizontal');
//     view.disablePopUps();
//     expect(view['getMargins']().top).toBe(0);
//   });
//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'vertical');
//     expect(view['getMargins']().left).toBe(28);
//   });
//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'vertical');
//     view.disablePopUps();
//     expect(view['getMargins']().left).toBe(0);
//   });
//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'vertical');
//     expect(view['getMargins']().right).toBe(40);
//   });
//   test('Размер отступов должен вычисляться корректно', () => {
//     view['slider'].getOrientation = jest.fn(() => 'vertical');
//     view.disableScale();
//     expect(view['getMargins']().right).toBe(0);
//   });
// });

// describe('Метод swapThumbs из класса SimpleJsSliderView', () => {
//   test('Значения Thumbs должны поменяться местами', () => {
//     const thumbOne = view['thumbOne'];
//     const thumbTwo = view['thumbTwo'];

//     view.swapThumbs();
//     expect(thumbOne).toBe(view['thumbTwo']);
//     expect(thumbTwo).toBe(view['thumbOne']);
//   });
//   test('Значения Thumbs не должны поменяться местами', () => {
//     view['thumbTwo'] = null;

//     const thumbOne = view['thumbOne'];
//     const thumbTwo = view['thumbTwo'];

//     view.swapThumbs();
//     expect(thumbOne).toBe(view['thumbOne']);
//     expect(thumbTwo).toBe(null);
//   });
// });