// /**
//  * @jest-environment jsdom
//  */

// /* eslint-disable comma-dangle */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable dot-notation */

// import SimpleSliderController from '../plugins/simple-slider/controller/simple-slider-controller';
// import * as orignalModel from '../plugins/simple-slider/model/simple-slider-model';
// import * as orignalView from '../plugins/simple-slider/view/simple-slider-view';

// jest.mock('../plugins/simple-slider/model/simple-slider-model');
// jest.mock('../plugins/simple-slider/view/simple-slider-view');

// const mockedView = orignalView as jest.Mocked<typeof orignalView>;
// const SimpleSliderView = mockedView.default;

// const mockedModel = orignalModel as jest.Mocked<typeof orignalModel>;
// const SimpleSliderModel = mockedModel.default;

// const settings = {
//   orientation: 'horizontal',
//   type: 'range',
//   scale: true,
//   popUps: true,
//   min: 0,
//   max: 10,
//   step: 1,
//   thumbOneValue: 3,
//   thumbTwoValue: 7,
//   sliderSize: { width: 500, height: 10 },
//   thumbSize: { width: 20, height: 20 },
// };

// const wrapper = document.createElement('div');
// let model = new SimpleSliderModel();
// let view = new SimpleSliderView(wrapper);

// let controller: SimpleSliderController;

// beforeEach(() => {
//   SimpleSliderView.mockClear();
//   view = new SimpleSliderView(wrapper);

//   SimpleSliderModel.mockClear();
//   model = new SimpleSliderModel();
// });

// describe('Init method', () => {
//   test('The getSliderSize method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     expect(SimpleSliderView.mock.instances[0].getSliderSize).toBeCalledTimes(1);
//   });
//   test('The getThumbSize method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     expect(SimpleSliderView.mock.instances[0].getThumbSize).toBeCalledTimes(1);
//   });
//   test('The refreshSliderState method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     expect(SimpleSliderModel.mock.instances[0].refreshSliderState).toBeCalledTimes(
//       1
//     );
//   });
// });

// describe('Update method', () => {
//   test('The updateThumbsState method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbIsDragged');
//     expect(
//       SimpleSliderModel.mock.instances[0].updateThumbsState
//     ).toBeCalledTimes(1);
//   });
//   test('The getThumbsPos method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbIsDragged');
//     expect(SimpleSliderView.mock.instances[0].getThumbsPos).toBeCalledTimes(1);
//   });
//   test('The updateThumbs method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderView.mock.instances[0].updateThumbs).toBeCalledTimes(1);
//   });
//   test('The updatePopUps method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderView.mock.instances[0].updatePopUps).toBeCalledTimes(1);
//   });
//   test('The updateProgressBar method from the SimpleSliderView class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbsPosIsUpdated');
//     expect(
//       SimpleSliderView.mock.instances[0].updateProgressBar
//     ).toBeCalledTimes(1);
//   });
//   test('The getThumbsPos method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderModel.mock.instances[0].getThumbsPos).toBeCalledTimes(1);
//   });
//   test('The getPopUpsParams method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbsPosIsUpdated');
//     expect(SimpleSliderModel.mock.instances[0].getPopUpsParams).toBeCalledTimes(
//       1
//     );
//   });
//   test('The getProgressBarParams method from the SimpleSliderModel class must be called once', () => {
//     controller = new SimpleSliderController({ model, view, settings });
//     controller.update('thumbsPosIsUpdated');
//     expect(
//       SimpleSliderModel.mock.instances[0].getProgressBarParams
//     ).toBeCalledTimes(1);
//   });
// });
