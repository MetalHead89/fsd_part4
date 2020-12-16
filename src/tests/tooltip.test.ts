/**
 * @jest-environment jsdom
 */

import Tooltip from '../plugins/sliderPlugin/view/tooltip';


let tooltipElem: HTMLDivElement = document.createElement('div');
let _this: Tooltip = new Tooltip(tooltipElem);

beforeEach(() => {
    tooltipElem = document.createElement('div');
    _this = new Tooltip(tooltipElem);
});

describe('Set value', () => {
    test('Should be newValue == tooltipInnerText == 48', () => {
        const NEW_VALUE: number = 48;
        _this.setValue(NEW_VALUE);

        expect((NEW_VALUE).toString()).toBe(tooltipElem.innerText);
    });

    test('Should be newValue == tooltipInnerText == 168', () => {
        const NEW_VALUE: number = 168;
        _this.setValue(NEW_VALUE);

        expect((NEW_VALUE).toString()).toBe(tooltipElem.innerText);
    });
});


describe('Remove', () => {
    test('The tooltip should be removed', () => {
        tooltipElem = document.createElement('div');
        tooltipElem.classList.add('slider__tooltip');
        document.body.append(tooltipElem);
        _this = new Tooltip(tooltipElem);

        expect(document.querySelectorAll('.slider__tooltip').length).toBe(1);
        _this.remove();
        expect(document.querySelectorAll('.slider__tooltip').length).toBe(0);
    });

    test('The vertical tooltip should be removed', () => {
        tooltipElem = document.createElement('div');
        tooltipElem.classList.add('slider__tooltip_vertical');
        document.body.append(tooltipElem);
        _this = new Tooltip(tooltipElem);

        expect(document.body.querySelectorAll('.slider__tooltip_vertical').length).toBe(1);
        _this.remove();
        expect(document.body.querySelectorAll('.slider__tooltip_vertical').length).toBe(0);
    });
});