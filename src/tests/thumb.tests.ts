/**
 * @jest-environment jsdom
 */

import { IThumbSize } from '../plugins/sliderPlugin/interfaces';

import Thumb from '../plugins/sliderPlugin/view/thumb';
import Observer from '../plugins/sliderPlugin/observer/observer';

let thumbElem: HTMLDivElement = document.createElement('div');
let observer = new Observer();
let _this = new Thumb(thumbElem, observer);

beforeEach(() => {
    thumbElem = document.createElement('div');
    observer = new Observer();
    _this = new Thumb(thumbElem, observer);
});


describe('Get element', () => {
    test('The thumb must exist and reference the same place as thumbElem', () => {
        expect(_this.getElement()).toBeDefined;
        expect(_this.getElement()).toBe(thumbElem);
    });

    test('The slider must exist, reference the same place as sliderElem, and have a new-thumb class', () => {
        thumbElem = document.createElement('div');
        thumbElem.classList.add('new-thumb');
        observer = new Observer();
        _this = new Thumb(thumbElem, observer);

        expect(_this.getElement()).toBeDefined;
        expect(_this.getElement()).toBe(thumbElem);
        expect(_this.getElement().classList.contains('new-slider'));
    });
});


describe('Get size', () => {
    test('Should be width: 0 and height: 0', () => {
        const thumbSize: IThumbSize = _this.getSize();

        expect(thumbSize.width).toBe(0);
        expect(thumbSize.height).toBe(0);
    });
});


describe('Set z-index', () => {
    test('Should be 6', () => {
        _this.setZIndex('6');
        expect(_this.getElement().style.zIndex).toBe('6');
    });

    test('Should be 28', () => {
        _this.setZIndex('28');
        expect(_this.getElement().style.zIndex).toBe('28');
    });
});

describe('Move to', () => {
    test('Should be left: 34 and 89', () => {
        _this.moveTo({ 'left': 34, 'top': 89 })
        expect(_this.getElement().style.left).toBe('34px');
        expect(_this.getElement().style.top).toBe('89px');
    });

    test('Should be left: 59 and 10', () => {
        _this.moveTo({ 'left': 59, 'top': 10 })
        expect(_this.getElement().style.left).toBe('59px');
        expect(_this.getElement().style.top).toBe('10px');
    });
});


describe('Remove', () => {
    test('The thumb should be removed', () => {
        thumbElem = document.createElement('div');
        observer = new Observer();
        thumbElem.classList.add('thumb');
        _this = new Thumb(thumbElem, observer);
        document.body.append(_this.getElement());


        expect(document.querySelectorAll('.thumb').length).toBe(1);
        _this.remove();
        expect(document.querySelectorAll('.thumb').length).toBe(0);
    });

    test('The vertical thumb should be removed', () => {
        thumbElem = document.createElement('div');
        observer = new Observer();
        thumbElem.classList.add('thumb_vertical');
        _this = new Thumb(thumbElem, observer);
        document.body.append(_this.getElement());

        expect(document.querySelectorAll('.thumb_vertical').length).toBe(1);
        _this.remove();
        expect(document.querySelectorAll('.thumb_vertical').length).toBe(0);
    });
});


describe('Thumb click event and startDrag method', () => {
    test('A notification should be sent containing a thumb element and z-index should be 3', () => {
        thumbElem = document.createElement('div');
        thumbElem.classList.add('slider__thumb_vertical');
        observer = new Observer();
        observer.subscribe('changeZIndexToAnotherThumb',
            (elem: HTMLDivElement) => { expect(elem).toBe(thumbElem) });
        document.body.append(thumbElem);
        _this = new Thumb(thumbElem, observer);

        expect(_this.getElement().style.zIndex).toBe('');

        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('mousedown', true, true)
        thumbElem.dispatchEvent(evt);

        expect(_this.getElement().style.zIndex).toBe('3');
    });
});

// describe('Thumb touch event and startDrag method', () => {
//     test('A notification should be sent containing a thumb element and z-index should be 3', () => {
//         thumbElem = document.createElement('div');
//         thumbElem.classList.add('slider__thumb_hotizontal');
//         observer = new Observer();
//         observer.subscribe('changeZIndexToAnotherThumb',
//             (elem: HTMLDivElement) => { /*expect(elem).toBe(thumbElem)*/ });
//         document.body.append(thumbElem);
//         _this = new Thumb(thumbElem, observer);

//         // expect(_this.getElement().style.zIndex).toBe('');
//         const touch = new Touch({
//             identifier: 0,
//             target: thumbElem,
//             clientX: 50,
//             clientY: 40,
//         });
//         // const evt: TouchEvent = new  TouchEvent ( 'touchstart' ,  { changedTouches : [touch] } ) ;
        
//         // thumbElem.dispatchEvent(evt);

//         // expect(_this.getElement().style.zIndex).toBe('3');
//     });
// });