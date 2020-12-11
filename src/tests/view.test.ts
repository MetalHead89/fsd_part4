/**
 * @jest-environment jsdom
 */

import View from '../plugins/sliderPlugin/view/view';
import Observer from '../plugins/sliderPlugin/observer/observer';
import { ISliderSize } from '../plugins/sliderPlugin/interfaces';

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
    test('An element with a track class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(0);
        _this.createSlider('track');
        expect(sliderWrapper.querySelectorAll('.track').length).toBe(1);
    });

    test('An element with a track_horizontal class must be in sliderWrapper', () => {
        expect(sliderWrapper.querySelectorAll('.track_horizontal').length).toBe(0);
        _this.createSlider('track_horizontal');
        expect(sliderWrapper.querySelectorAll('.track_horizontal').length).toBe(1);
    });
});