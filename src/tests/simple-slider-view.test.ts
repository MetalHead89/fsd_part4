/**
 * @jest-environment jsdom
 */

/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */

import SimpleSliderView from '../plugins/simple-slider/view/simple-slider-view';

jest.mock('../plugins/simple-slider/view/container/container');
jest.mock('../plugins/simple-slider/view/track/track');
jest.mock('../plugins/simple-slider/view/thumb/thumb');
jest.mock('../plugins/simple-slider/view/pop-up/pop-up');
jest.mock('../plugins/simple-slider/view/progress-bar/progress-bar');
jest.mock('../plugins/simple-slider/view/scale/scale');

let wrapper: HTMLDivElement;
let view: SimpleSliderView;

beforeEach(() => {
  wrapper = document.createElement('div');
  view = new SimpleSliderView(wrapper);
});

describe('Window resize', () => {
  test('Notify method of the SimpleSliderView class should be called once', () => {
    const spy = spyOn(view.subject, 'notify');
    const evt = new window.Event('resize');
    window.dispatchEvent(evt);
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Assemble slider', () => {
  test('Wrapper should be contain a slider element', () => {
    expect(wrapper.querySelector('.slider')).not.toBeNull();
  });
  test('Wrapper should be contain a track element', () => {
    expect(wrapper.querySelector('.slider__track')).not.toBeNull();
  });
  test('Wrapper should be contain a thumb element', () => {
    expect(wrapper.querySelector('.slider__thumb')).not.toBeNull();
  });
  test('Wrapper should be contain a pop-up element', () => {
    expect(wrapper.querySelector('.slider__pop-up')).not.toBeNull();
  });
  test('Wrapper should be contain a progress-bar element', () => {
    expect(wrapper.querySelector('.slider__progress-bar')).not.toBeNull();
  });
  test('Wrapper should be contain a scale element', () => {
    expect(wrapper.querySelector('.slider__scale')).not.toBeNull();
  });
  test('Wrapper should be contain a slider element', () => {
    view['container'].remove();
    view['thumbTwo'] = null;
    view['popUpOne'] = null;
    view['popUpTwo'] = null;
    view['scale'] = null;
    view['assembleSlider']();
    expect(wrapper.querySelector('.slider')).not.toBeNull();
  });
});

describe('Update method', () => {
  test('Notify method of the SimpleSliderView class should be called once', () => {
    const spy = spyOn(view.subject, 'notify');
    view.update('thumbIsDragged');
    expect(spy).toBeCalledTimes(1);
  });
  test('The resetZIndex method of the thumbOne object should be called once', () => {
    const spy = spyOn(view['thumbOne'], 'resetZIndex');
    view.update('thumbIsCatched');
    expect(spy).toBeCalledTimes(1);
  });
  test('The resetZIndex method of thumbTwo must be called twice', () => {
    if (view['thumbTwo'] !== null) {
      const spy = spyOn(view['thumbTwo'], 'resetZIndex');
      view.update('thumbIsCatched');
      view.update('thumbIsCatched');
      expect(spy).toBeCalledTimes(2);
    }
  });
  test('Notify method of the SimpleSliderView class not should be called', () => {
    const spy = spyOn(view.subject, 'notify');
    view.update('emptyEvent');
    expect(spy).toBeCalledTimes(0);
  });
  test('Notify method of the SimpleSliderView class should be called once', () => {
    const spy = spyOn(view.subject, 'notify');
    view.update('clickToTrack');
    expect(spy).toBeCalledTimes(1);
  });
  test('Notify method of the SimpleSliderView class should be called once', () => {
    const spy = spyOn(view.subject, 'notify');
    view.update('clickToScale');
    expect(spy).toBeCalledTimes(1);
  });
});

describe('Switch to horizontal', () => {
  test('The container must contain a class slider_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['container'].getElement().classList.contains('slider_horizontal'),
    ).toBe(true);
  });
  test('The track must contain a class slider__track_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['track'].getElement().classList.contains('slider__track_horizontal'),
    ).toBe(true);
  });
  test('The thumbOne must contain a class slider__thumb_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['thumbOne']
        .getElement()
        .classList.contains('slider__thumb_horizontal'),
    ).toBe(true);
  });
  test('The thumbTwo must contain a class slider__thumb_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['thumbTwo']
        ?.getElement()
        .classList.contains('slider__thumb_horizontal'),
    ).toBe(true);
  });
  test('The popUpOne must contain a class slider__pop-up_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['popUpOne']
        ?.getElement()
        .classList.contains('slider__pop-up_horizontal'),
    ).toBe(true);
  });
  test('The popUpTwo must contain a class slider__pop-up_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['popUpTwo']
        ?.getElement()
        .classList.contains('slider__pop-up_horizontal'),
    ).toBe(true);
  });
  test('The progressBar must contain a class slider__progress-bar_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['progressBar']
        .getElement()
        .classList.contains('slider__progress-bar_horizontal'),
    ).toBe(true);
  });
  test('The scale must contain a class slider__scale_horizontal', () => {
    view.switchToHorizontal();
    expect(
      view['scale']
        ?.getElement()
        .classList.contains('slider__scale_horizontal'),
    ).toBe(true);
  });
});

describe('Switch to vertical', () => {
  test('The container must contain a class slider_vertical', () => {
    view.switchToVertical();
    expect(
      view['container'].getElement().classList.contains('slider_vertical'),
    ).toBe(true);
  });
  test('The track must contain a class slider__track_horizontal', () => {
    view.switchToVertical();
    expect(
      view['track'].getElement().classList.contains('slider__track_vertical'),
    ).toBe(true);
  });
  test('The thumbOne must contain a class slider__thumb_vertical', () => {
    view.switchToVertical();
    expect(
      view['thumbOne']
        .getElement()
        .classList.contains('slider__thumb_vertical'),
    ).toBe(true);
  });
  test('The thumbTwo must contain a class slider__thumb_vertical', () => {
    view.switchToVertical();
    expect(
      view['thumbTwo']
        ?.getElement()
        .classList.contains('slider__thumb_vertical'),
    ).toBe(true);
  });
  test('The popUpOne must contain a class slider__pop-up_vertical', () => {
    view.switchToVertical();
    expect(
      view['popUpOne']
        ?.getElement()
        .classList.contains('slider__pop-up_vertical'),
    ).toBe(true);
  });
  test('The popUpTwo must contain a class slider__pop-up_vertical', () => {
    view.switchToVertical();
    expect(
      view['popUpTwo']
        ?.getElement()
        .classList.contains('slider__pop-up_vertical'),
    ).toBe(true);
  });
  test('The progressBar must contain a class slider__progress-bar_vertical', () => {
    view.switchToVertical();
    expect(
      view['progressBar']
        .getElement()
        .classList.contains('slider__progress-bar_vertical'),
    ).toBe(true);
  });
  test('The scale must contain a class slider__scale_vertical', () => {
    view.switchToVertical();
    expect(
      view['scale']?.getElement().classList.contains('slider__scale_vertical'),
    ).toBe(true);
  });
});

describe('Switch to single', () => {
  test('ThumbTwo should be null', () => {
    view.switchToSingle();
    expect(view['thumbTwo']).toBeNull();
  });
});

describe('Switch to range', () => {
  test('ThumbTwo should be defined', () => {
    view.switchToRange();
    expect(view['thumbTwo']).not.toBeNull();
  });
  test('ThumbTwo should be defined', () => {
    view.switchToSingle();
    view.switchToRange();
    expect(view['thumbTwo']).not.toBeNull();
  });
  test('ThumbTwo should be defined ana popUpTwo should be null', () => {
    view.switchToSingle();
    view['popUpOne'] = null;
    view.switchToRange();
    expect(view['thumbTwo']).not.toBeNull();
    expect(view['popUpTwo']).toBeNull();
  });
});

describe('Disable pop ups', () => {
  test('PopUpOne should be null', () => {
    view.disablePopUps();
    expect(view['popUpOne']).toBeNull();
  });
  test('PopUpTwo should be null', () => {
    view.switchToRange();
    view.disablePopUps();
    expect(view['popUpTwo']).toBeNull();
  });
});

describe('Enable pop ups', () => {
  test('PopUpOne should be defined', () => {
    view.disablePopUps();
    view.enablePopUps();
    expect(view['popUpOne']).toBeDefined();
  });
  test('PopUpTwo should be null', () => {
    view.switchToSingle();
    view.enablePopUps();
    expect(view['popUpTwo']).toBeNull();
  });
  test('PopUpTwo should be defined', () => {
    view.switchToSingle();
    view.switchToRange();
    view.disablePopUps();
    view.enablePopUps();
    expect(view['popUpTwo']).toBeDefined();
  });
});

describe('Disable scale', () => {
  test('Scale should be null', () => {
    view.disableScale();
    expect(view['scale']).toBeNull();
  });
  test('Scale should be null', () => {
    view.enableScale();
    view.disableScale();
    expect(view['scale']).toBeNull();
  });
});

describe('Enable scale', () => {
  test('Scale should be defined', () => {
    view.enableScale();
    view.enableScale();
    expect(view['scale']).toBeDefined();
  });
  test('Scale should be defined', () => {
    view.disableScale();
    view.enableScale();
    expect(view['scale']).toBeDefined();
  });
});

describe('Get thumb size', () => {
  test('Should be true', () => {
    expect(view.getThumbSize()).toBe(true);
  });
});

describe('Get slider size', () => {
  test('Should be true', () => {
    expect(view.getSliderSize()).toBe(true);
  });
});

describe('Get thumbs positions', () => {
  test('ThumbOne should be true', () => {
    expect(view.getThumbsPos().thumbOne).toBe(true);
  });
  test('ThumbTwo should be true', () => {
    expect(view.getThumbsPos().thumbTwo).toBe(true);
  });
  test('ThumbTwo should be true', () => {
    view.switchToSingle();
    expect(view.getThumbsPos().thumbOne).toBe(true);
  });
  test('ThumbTwo should be true', () => {
    view.switchToSingle();
    expect(view.getThumbsPos().thumbTwo).toBe(null);
  });
});

describe('Update thumbs', () => {
  test('The moveTo method of the thumbOne object should be called once', () => {
    const spy = spyOn(view['thumbOne'], 'moveTo');
    view.updateThumbs({
      thumbOne: { left: 0, top: 0 },
      thumbTwo: { left: 0, top: 0 },
    });
    expect(spy).toBeCalledTimes(1);
  });
  test('The moveTo method of the thumbTwo object must be called zero times', () => {
    if (view['thumbTwo'] !== null) {
      const spy = spyOn(view['thumbTwo'], 'moveTo');
      view.updateThumbs({
        thumbOne: { left: 0, top: 0 },
        thumbTwo: null,
      });
      expect(spy).toBeCalledTimes(0);
    }
  });
  test('The moveTo method of thumbTwo should be called twice', () => {
    if (view['thumbTwo'] !== null) {
      const spy = spyOn(view['thumbTwo'], 'moveTo');
      view.updateThumbs({
        thumbOne: { left: 0, top: 0 },
        thumbTwo: { left: 0, top: 0 },
      });
      view.updateThumbs({
        thumbOne: { left: 0, top: 0 },
        thumbTwo: { left: 0, top: 0 },
      });
      expect(spy).toBeCalledTimes(2);
    }
  });
});

describe('Update progress bar', () => {
  test('The update method of the progressBar object should be called once', () => {
    const spy = spyOn(view['progressBar'], 'update');
    view.updateProgressBar({
      position: { left: 0, top: 0 },
      size: { width: 0, height: 0 },
    });
    expect(spy).toBeCalledTimes(1);
  });
  test('The update method of the progressBar object should be called twice', () => {
    const spy = spyOn(view['progressBar'], 'update');
    view.updateProgressBar({
      position: { left: 0, top: 0 },
      size: { width: 0, height: 0 },
    });
    view.updateProgressBar({
      position: { left: 0, top: 0 },
      size: { width: 0, height: 0 },
    });
    expect(spy).toBeCalledTimes(2);
  });
});

describe('Update pop ups', () => {
  test('The update method of the popUpOne object should be called once', () => {
    let spy;
    if (view['popUpOne'] !== null) {
      spy = spyOn(view['popUpOne'], 'update');
    }
    view.updatePopUps({
      popUpOne: { value: 0, position: { left: 0, top: 0 } },
      popUpTwo: { value: 0, position: { left: 0, top: 0 } },
    });
    expect(spy).toBeCalledTimes(1);
  });
  test('The update method of the popUpTwo object should be called twice', () => {
    let spy;
    if (view['popUpTwo'] !== null) {
      spy = spyOn(view['popUpTwo'], 'update');
    }
    view.updatePopUps({
      popUpOne: { value: 0, position: { left: 0, top: 0 } },
      popUpTwo: { value: 0, position: { left: 0, top: 0 } },
    });
    view.updatePopUps({
      popUpOne: { value: 0, position: { left: 0, top: 0 } },
      popUpTwo: { value: 0, position: { left: 0, top: 0 } },
    });
    expect(spy).toBeCalledTimes(2);
  });
  test('The update method of the popUpOne object should be called zero times', () => {
    let spy1;
    let spy2;
    view.disablePopUps();
    if (view['popUpOne'] !== null) {
      spy1 = spyOn(view['popUpOne'], 'update');
    }
    if (view['popUpTwo'] !== null) {
      spy2 = spyOn(view['popUpTwo'], 'update');
    }
    view.updatePopUps({
      popUpOne: { value: 0, position: { left: 0, top: 0 } },
      popUpTwo: { value: 0, position: { left: 0, top: 0 } },
    });
    expect(spy1).toBeUndefined();
    expect(spy2).toBeUndefined();
  });
});

describe('Get scale point size', () => {
  test('ScalePointSize should be {width: 0, height: 0}', () => {
    view.disableScale();
    expect(view.getScalePointSize(10).width).toBe(0);
    expect(view.getScalePointSize(10).height).toBe(0);
  });
  test('ScalePointSize should be true', () => {
    expect(view.getScalePointSize(10)).toBe(true);
  });
});

describe('Add scale point', () => {
  test('The length of the scale points array must be 3', () => {
    view.addScalePoints([
      {
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 },
        value: 0,
      },
      {
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 },
        value: 0,
      },
    ]);
    expect(
      view['scale']?.getElement().querySelectorAll('.scale-point').length,
    ).toBe(2);
  });
  test('The length of the scale points array must be 3', () => {
    view.addScalePoints([
      {
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 },
        value: 0,
      },
      {
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 },
        value: 0,
      },
      {
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 },
        value: 0,
      },
    ]);
    expect(
      view['scale']?.getElement().querySelectorAll('.scale-point').length,
    ).toBe(3);
  });
});

describe('Get track click position', () => {
  test('Function should be return true', () => {
    expect(view.getTrackClickPosition()).toBe(true);
  });
});

describe('Get scale click position', () => {
  test('Function should be return true', () => {
    expect(view.getScaleClickPosition()).toBe(true);
  });
  test('Function should be return {left: 0, top: 0}', () => {
    view.disableScale();
    expect(view.getScaleClickPosition().left).toBe(0);
    expect(view.getScaleClickPosition().top).toBe(0);
  });
});

describe('Get margins', () => {
  beforeEach(() => {
    view['container'].getRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 25,
        left: 49,
        bottom: 60,
        right: 5,
        x: 35,
        y: 48,
        toJSON: () => null,
      };
    });

    if (view['scale'] !== null) {
      view['scale'].getRect = jest.fn(() => {
        return {
          width: 120,
          height: 120,
          top: 11,
          left: 49,
          bottom: 87,
          right: 45,
          x: 35,
          y: 48,
          toJSON: () => null,
        };
      });
    }

    if (view['popUpOne'] !== null) {
      view['popUpOne'].getRect = jest.fn(() => {
        return {
          width: 120,
          height: 120,
          top: 13,
          left: 21,
          bottom: 87,
          right: 5,
          x: 35,
          y: 48,
          toJSON: () => null,
        };
      });
    }
  });

  test('Slider margin-bottom should be 27', () => {
    view['container'].getOrientation = jest.fn(() => 'horizontal');
    expect(view['getMargins']().bottom).toBe(27);
  });
  test('Slider margin-bottom should be 0', () => {
    view['container'].getOrientation = jest.fn(() => 'horizontal');
    view.disableScale();
    expect(view['getMargins']().bottom).toBe(0);
  });
  test('Slider margin-top should be 12', () => {
    view['container'].getOrientation = jest.fn(() => 'horizontal');
    expect(view['getMargins']().top).toBe(12);
  });
  test('Slider margin-top should be 0', () => {
    view['container'].getOrientation = jest.fn(() => 'horizontal');
    view.disablePopUps();
    expect(view['getMargins']().top).toBe(0);
  });
  test('Slider margin-left should be 28', () => {
    view['container'].getOrientation = jest.fn(() => 'vertical');
    expect(view['getMargins']().left).toBe(28);
  });
  test('Slider margin-left should be 0', () => {
    view['container'].getOrientation = jest.fn(() => 'vertical');
    view.disablePopUps();
    expect(view['getMargins']().left).toBe(0);
  });
  test('Slider margin-right should be 40', () => {
    view['container'].getOrientation = jest.fn(() => 'vertical');
    expect(view['getMargins']().right).toBe(40);
  });
  test('Slider margin-right should be 0', () => {
    view['container'].getOrientation = jest.fn(() => 'vertical');
    view.disableScale();
    expect(view['getMargins']().right).toBe(0);
  });
});
