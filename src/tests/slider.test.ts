/**
 * @jest-environment jsdom
 */

import {ISliderSize} from '../plugins/sliderPlugin/interfaces'

import Slider from '../plugins/sliderPlugin/view/slider'

let sliderElem: HTMLDivElement = document.createElement('div');
let _this = new Slider(sliderElem);

beforeEach(() => {
    sliderElem = document.createElement('div');
    _this = new Slider(sliderElem);
});


describe('Get element', () => {
    test('The slider must exist and reference the same place as sliderElem', () => {
        expect(_this.getElement()).toBeDefined;
        expect(_this.getElement()).toBe(sliderElem);
    });

    test('The slider must exist, reference the same place as sliderElem, and have a new-slider class', () => {
        sliderElem = document.createElement('div');
        sliderElem.classList.add('new-slider')
        _this = new Slider(sliderElem);
        expect(_this.getElement()).toBeDefined;
        expect(_this.getElement()).toBe(sliderElem);
        expect(_this.getElement().classList.contains('new-slider'));
    });
});

describe('set size', () => {
    test('Should be width: 50px and height: 480px', () => {
        _this.setSize({ 'width': 50, 'height': 480 });
        expect(sliderElem.style.width).toBe('50px');
        expect(sliderElem.style.height).toBe('480px');
    });

    test('Should be width: 180px and height: 60px', () => {
        sliderElem = document.createElement('div');
        sliderElem.classList.add('slider_vertical');
        _this = new Slider(sliderElem);

        _this.setSize({ 'width': 180, 'height': 60 });
        expect(sliderElem.style.width).toBe('180px');
        expect(sliderElem.style.height).toBe('60px');
    });
});


describe('get size', () => {
    test('Should be width: 0 and height: 0', () => {
        const sliderSize: ISliderSize = _this.getSize();

        expect(sliderSize.width).toBe(0);
        expect(sliderSize.height).toBe(0);
    });
});


describe('Remove', () => {
    test('The slider should be removed', () => {
        sliderElem = document.createElement('div');
        sliderElem.classList.add('slider');
        _this = new Slider(sliderElem);
        document.body.append(_this.getElement());


        expect(document.querySelectorAll('.slider').length).toBe(1);
        _this.remove();
        expect(document.querySelectorAll('.slider').length).toBe(0);
    });

    test('The vertical slider should be removed', () => {
        sliderElem = document.createElement('div');
        sliderElem.classList.add('slider_vertical');
        _this = new Slider(sliderElem);
        document.body.append(_this.getElement());

        expect(document.querySelectorAll('.slider_vertical').length).toBe(1);
        _this.remove();
        expect(document.querySelectorAll('.slider_vertical').length).toBe(0);
    });
});