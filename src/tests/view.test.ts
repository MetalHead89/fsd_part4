/**
 * @jest-environment jsdom
 */

import View from '../plugins/sliderPlugin/view/view';
import Observer from '../plugins/sliderPlugin/observer/observer';
import { ISliderSize, IThumbSize } from '../plugins/sliderPlugin/interfaces';

let sliderWrapper: HTMLDivElement = document.createElement('div');
let observer: Observer = new Observer();
let _this: View = new View(observer, sliderWrapper);

beforeEach(() => {
    sliderWrapper = document.createElement('div');
    observer = new Observer();
    _this = new View(observer, sliderWrapper);
});


describe('Create slider', () => {
    test('An element with a slider class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.slider').length).toBe(0);

        observer.subscribe('sliderElementIsCreated', 
            (size: ISliderSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        )
        _this.createSlider('slider');

        expect(sliderWrapper.querySelectorAll('.slider').length).toBe(1);
    });

    test('An element with a slider_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.slider_horizontal').length).toBe(0);

        observer.subscribe('sliderElementIsCreated', 
            (size: ISliderSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        )
        _this.createSlider('slider_horizontal');

        expect(sliderWrapper.querySelectorAll('.slider_horizontal').length).toBe(1);
    });
});


describe('Create track', () => {
    test('An element with a track class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(0);
        _this.createTrack('track');
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(0);
    });

    test('An element with a track class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(0);
        _this.createSlider('slider');
        _this.createTrack('track');
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(1);
    });

    test('An element with a track_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track_horizontal').length).toBe(0);
        _this.createSlider('slider');
        _this.createTrack('track_horizontal');
        expect(sliderWrapper.querySelectorAll('.track_horizontal').length).toBe(1);
    });
});


describe('Create first thumb', () => {
    test('An element with a thumb-one class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(0);

        observer.subscribe('thumbOneIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );    
        _this.createThumbOne('thumb-one');

        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(0);
    });

    test('An element with a thumb-one class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(0);

        observer.subscribe('thumbOneIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one');

        expect(sliderWrapper.querySelectorAll('.thumb-one').length).toBe(1);
    });

    test('An element with a thumb-one_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-one_horizontal').length).toBe(0);

        observer.subscribe('thumbOneIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbOne('thumb-one_horizontal');

        expect(sliderWrapper.querySelectorAll('.thumb-one_horizontal').length).toBe(1);
    });
});


describe('Create second thumb', () => {
    test('An element with a thumb-two class not must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(0);

        observer.subscribe('thumbTwoIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );    
        _this.createThumbTwo('thumb-two');

        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(0);
    });

    test('An element with a thumb-two class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(0);

        observer.subscribe('thumbTwoIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-two');

        expect(sliderWrapper.querySelectorAll('.thumb-two').length).toBe(1);
    });

    test('An element with a thumb-two_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.thumb-two_horizontal').length).toBe(0);

        observer.subscribe('thumbTwoIsCreated', 
            (size: IThumbSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        );
        _this.createSlider('slider');
        _this.createThumbTwo('thumb-two_horizontal');

        expect(sliderWrapper.querySelectorAll('.thumb-two_horizontal').length).toBe(1);
    });
});


describe('Create first tooltip', () => {
    test('An element with a tooltip-one class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-one').length).toBe(0);
        _this.createSlider('tooltip-one');
        expect(sliderWrapper.querySelectorAll('.tooltip-one').length).toBe(1);
    });

    test('An element with a tooltip-one_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-one_horizontal').length).toBe(0);
        _this.createSlider('tooltip-one_horizontal');
        expect(sliderWrapper.querySelectorAll('.tooltip-one_horizontal').length).toBe(1);
    });
});


describe('Create second tooltip', () => {
    test('An element with a tooltip-two class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-two').length).toBe(0);
        _this.createSlider('tooltip-two');
        expect(sliderWrapper.querySelectorAll('.tooltip-two').length).toBe(1);
    });

    test('An element with a tooltip-two_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.tooltip-two_horizontal').length).toBe(0);
        _this.createSlider('tooltip-two_horizontal');
        expect(sliderWrapper.querySelectorAll('.tooltip-two_horizontal').length).toBe(1);
    });
});