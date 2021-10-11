// /**
//  * @jest-environment jsdom
//  */

// /* eslint-disable dot-notation */
// /* eslint-disable arrow-body-style */
// /* eslint-disable comma-dangle */

// import SimpleJsSliderView from '../plugins/simple-js-slider/view/simple-js-slider-view';

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
//   test('Слайдер должен содержать элемент с классом slider_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['slider'].getControl().classList.contains('slider_horizontal')
//     ).toBe(true);
//   });
//   test('Track должен содержать элемент с классом slider__track_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['track'].getControl().classList.contains('slider__track_horizontal')
//     ).toBe(true);
//   });
//   test('ThumbOne должен содержать элемент с классом slider__thumb_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['thumbOne']
//         .getControl()
//         .classList.contains('slider__thumb_horizontal')
//     ).toBe(true);
//   });
//   test('ThumbTwo должен содержать элемент с классом slider__thumb_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['thumbTwo']
//         ?.getControl()
//         .classList.contains('slider__thumb_horizontal')
//     ).toBe(true);
//   });
//   test('PopUpOne должен содержать элемент с классом slider__pop-up_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['popUpOne']
//         ?.getControl()
//         .classList.contains('slider__pop-up_horizontal')
//     ).toBe(true);
//   });
//   test('PopUpTwo должен содержать элемент с классом slider__pop-up_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['popUpTwo']
//         ?.getControl()
//         .classList.contains('slider__pop-up_horizontal')
//     ).toBe(true);
//   });
//   test('ProgressBar должен содержать элемент с классом slider__progress-bar_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['progressBar']
//         .getControl()
//         .classList.contains('slider__progress-bar_horizontal')
//     ).toBe(true);
//   });
//   test('Scale должен содержать элемент с классом slider__scale_horizontal', () => {
//     view.switchToHorizontal();
//     expect(
//       view['scale']?.getControl().classList.contains('slider__scale_horizontal')
//     ).toBe(true);
//   });
// });

// describe('Метод switchToVertical из класса SimpleJsSliderView', () => {
//   test('Слайдер должен содержать элемент с классом slider_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['slider'].getControl().classList.contains('slider_vertical')
//     ).toBe(true);
//   });
//   test('Track должен содержать элемент с классом slider__track_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['track'].getControl().classList.contains('slider__track_vertical')
//     ).toBe(true);
//   });
//   test('ThumbOne должен содержать элемент с классом slider__thumb_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['thumbOne'].getControl().classList.contains('slider__thumb_vertical')
//     ).toBe(true);
//   });
//   test('ThumbTwo должен содержать элемент с классом slider__thumb_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['thumbTwo']
//         ?.getControl()
//         .classList.contains('slider__thumb_vertical')
//     ).toBe(true);
//   });
//   test('PopUpOne должен содержать элемент с классом slider__pop-up_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['popUpOne']
//         ?.getControl()
//         .classList.contains('slider__pop-up_vertical')
//     ).toBe(true);
//   });
//   test('PopUpTwo должен содержать элемент с классом slider__pop-up_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['popUpTwo']
//         ?.getControl()
//         .classList.contains('slider__pop-up_vertical')
//     ).toBe(true);
//   });
//   test('ProgressBar должен содержать элемент с классом slider__progress-bar_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['progressBar']
//         .getControl()
//         .classList.contains('slider__progress-bar_vertical')
//     ).toBe(true);
//   });
//   test('Scale должен содержать элемент с классом slider__scale_vertical', () => {
//     view.switchToVertical();
//     expect(
//       view['scale']?.getControl().classList.contains('slider__scale_vertical')
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
