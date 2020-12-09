/**
 * @jest-environment jsdom
 */

import { ICursorPosition } from '../plugins/sliderPlugin/interfaces'

import Observer from "../plugins/sliderPlugin/observer/observer";
import Scale from "../plugins/sliderPlugin/view/scale";

let scaleElem: HTMLDivElement = document.createElement('div');
let observer: Observer = new Observer();
let _this = new Scale(scaleElem, observer);

beforeEach(() => {
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

    test('Value should be 5', () => {
        const scalePoint: HTMLElement = _this.addScalePoint(112, 50, 5);
        const divisionLabel: HTMLLabelElement | null = scalePoint.querySelector('.slider__scale-point-label');
        expect(divisionLabel).toBeDefined;
        if (divisionLabel !== null) {
            expect(divisionLabel.innerText).toBe('5');
        }
    });

    test('Value should be 112', () => {
        const scalePoint: HTMLElement = _this.addScalePoint(112, 50, 112);
        const divisionLabel: HTMLLabelElement | null = scalePoint.querySelector('.slider__scale-point-label');
        expect(divisionLabel).toBeDefined;
        if (divisionLabel !== null) {
            expect(divisionLabel.innerText).toBe('112');
        }
    });

    test('Width should be 50px', () => {
        const scalePoint: HTMLElement = _this.addScalePoint(112, 50, 5);
        expect(scalePoint.style.width).toBe('50px');
    });

    test('Width should be 68px', () => {
        const scalePoint: HTMLElement = _this.addScalePoint(112, 68, 5);
        expect(scalePoint.style.width).toBe('68px');
    });

    test('Left should Be 112px', () => {
        const scalePoint: HTMLElement = _this.addScalePoint(112, 50, 5);
        expect(scalePoint.style.left).toBe('112px');
    });

    test('Top should Be 300px', () => {
        scaleElem = document.createElement('div');
        scaleElem.classList.add('slider__scale_vertical');
        observer = new Observer();
        _this = new Scale(scaleElem, observer);

        const scalePoint: HTMLElement = _this.addScalePoint(300, 50, 5);
        expect(scalePoint.style.top).toBe('300px');
    });

});


describe('Remove', () => {

    test('The scale should be removed', () => {
        const page: HTMLDivElement = document.createElement('div');

        scaleElem = document.createElement('div');
        scaleElem.classList.add('slider__scale');
        observer = new Observer();
        page.append(scaleElem);
        _this = new Scale(scaleElem, observer);

        expect(page.querySelectorAll('.slider__scale').length).toBe(1);
        _this.remove();
        expect(page.querySelectorAll('.slider__scale').length).toBe(0);
    });

    test('The vertical scale should be removed', () => {
        const page: HTMLDivElement = document.createElement('div');

        scaleElem = document.createElement('div');
        scaleElem.classList.add('slider__scale_vertical');
        observer = new Observer();
        page.append(scaleElem);
        _this = new Scale(scaleElem, observer);

        expect(page.querySelectorAll('.slider__scale_vertical').length).toBe(1);
        _this.remove();
        expect(page.querySelectorAll('.slider__scale_vertical').length).toBe(0);
    });

});


describe('Set scale size', () => {

    test('Should be width: 50px and height: 480px', () => {
        _this.setScaleSize(50, 480);
        expect(scaleElem.style.width).toBe('50px');
        expect(scaleElem.style.height).toBe('480px');
    });

    test('Should be width: 180px and height: 60px', () => {
        scaleElem = document.createElement('div');
        scaleElem.classList.add('slider__scale_vertical');
        observer = new Observer();
        _this = new Scale(scaleElem, observer);

        _this.setScaleSize(180, 60);
        expect(scaleElem.style.width).toBe('180px');
        expect(scaleElem.style.height).toBe('60px');
    });

});


describe('Scale click event and getPosition method', () => {

    test('Should be x: 50 and y: 80', () => {

        let cursorPosition: ICursorPosition = { 'x': 1, 'y': 1 };
        scaleElem = document.createElement('div');
        scaleElem.classList.add('slider__scale_vertical');
        observer = new Observer();
        observer.subscribe('clickOnTheScale',
            (position: ICursorPosition) => { cursorPosition = position });

        scaleElem = document.createElement('div');
        scaleElem.classList.add('slider__scale_vertical');
        document.body.append(scaleElem);
        _this = new Scale(scaleElem, observer);
        
        const evt = document.createEvent('MouseEvent');
        evt.clientX;
        evt.initMouseEvent('click', true, true, window, 0, 50, 80, 50, 80, false, false, false, false, 0, null)
        scaleElem.dispatchEvent(evt);

        expect(cursorPosition.x).toBe(50);
        expect(cursorPosition.y).toBe(80);

    });

    // test('Should be width: 50px and height: 480px', () => {

    //     let cursorPosition: ICursorPosition = { 'x': 1, 'y': 1 };
    //     scaleElem = document.createElement('div');
    //     scaleElem.classList.add('slider__scale_vertical');
    //     scaleElem.style.position = 'absolute';
        
    //     observer = new Observer();
    //     observer.subscribe('clickOnTheScale',
    //         (position: ICursorPosition) => { cursorPosition = position });

    //     scaleElem = document.createElement('div');
    //     scaleElem.classList.add('slider__scale_vertical');
    //     document.body.append(scaleElem);
    //     _this = new Scale(scaleElem, observer);
    //     body.style.left = '80px';
    //     body.style.right = '100px';
        
    //     const evt = document.createEvent('MouseEvent');
    //     evt.clientX;
    //     evt.initMouseEvent('click', true, true, window, 0, 30, 80, 30, 80, false, false, false, false, 0, null)
    //     scaleElem.dispatchEvent(evt);

    //     expect(cursorPosition.x).toBe(50);
    //     expect(cursorPosition.y).toBe(80);

    // });

});