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
    test('Should be eidth: 0 and height: 0', () => {
        observer.subscribe('sliderElementIsCreated', 
            (size: ISliderSize) => {
                expect(size.width).toBe(0);
                expect(size.height).toBe(0);
            }
        )
        _this.createSlider('slider');
    });
});