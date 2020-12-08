/**
 * @jest-environment jsdom
 */

import Observer from "../plugins/sliderPlugin/observer/observer";
import Scale from "../plugins/sliderPlugin/view/scale";


let scaleElem: HTMLDivElement = document.createElement('div');
let observer: Observer = new Observer();
let _this = new Scale(scaleElem, observer);


beforeEach( () => {
    scaleElem = document.createElement('div');
    observer = new Observer();
    _this = new Scale(scaleElem, observer);
});


describe('Add scale point', () => {

    test('The scale point must contain the horizontal orientation class', () => {
        const scalePoint: HTMLElement = _this.addScalePoint(112, 50, 5);
        expect(scalePoint.classList.contains('slider__scale-point_horizontal')).toBe(true);
        expect(scalePoint.classList.contains('slider__scale-point')).toBe(true);
        expect(scalePoint.classList.contains('slider__scale-point_vertical')).toBe(false);
    });

    test('The scale point must contain the vertical orientation class', () => {
        scaleElem = document.createElement('div');
        scaleElem.classList.add('slider__scale_vertical');
        observer = new Observer();
        _this = new Scale(scaleElem, observer);

        const scalePoint: HTMLElement = _this.addScalePoint(112, 50, 5);
        expect(scalePoint.classList.contains('slider__scale-point_horizontal')).toBe(false);
        expect(scalePoint.classList.contains('slider__scale-point')).toBe(true);
        expect(scalePoint.classList.contains('slider__scale-point_vertical')).toBe(true);
    });


    
});