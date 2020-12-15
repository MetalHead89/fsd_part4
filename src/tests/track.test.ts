/**
 * @jest-environment jsdom
 */

import Track from '../plugins/sliderPlugin/view/track';
import Observer from '../plugins/sliderPlugin/observer/observer';
import { ICursorPosition } from '../plugins/sliderPlugin/interfaces';

describe('Click event and getPosition method', () => {
    test('Should be x: 44 and y: 150', () => {
        let cursorPosition: ICursorPosition = { 'x': 0, 'y': 0 };
        const trackElem: HTMLDivElement = document.createElement('div');
        trackElem.classList.add('slider__track_vertical');
        const observer: Observer = new Observer();
        observer.subscribe('clickOnTheTrack',
            (position: ICursorPosition) => { cursorPosition = position });
            
        document.body.append(trackElem);
        const _this = new Track(trackElem, observer);
        
        const evt = document.createEvent('MouseEvent');
        evt.initMouseEvent('click', true, true, window, 0, 44, 150, 44, 150, false, false, false, false, 0, null)
        trackElem.dispatchEvent(evt);

        expect(cursorPosition.x).toBe(44);
        expect(cursorPosition.y).toBe(150);
    });

    test('Should be x: 647 and y: 31', () => {
        let cursorPosition: ICursorPosition = { 'x': 0, 'y': 0 };
        const trackElem: HTMLDivElement = document.createElement('div');
        trackElem.classList.add('slider__track_horizontal');
        const observer: Observer = new Observer();
        observer.subscribe('clickOnTheTrack',
            (position: ICursorPosition) => { cursorPosition = position });
            
        document.body.append(trackElem);
        const _this = new Track(trackElem, observer);
        
        const evt = document.createEvent('MouseEvent');
        evt.initMouseEvent('click', true, true, window, 0, 647, 31, 647, 31, false, false, false, false, 0, null)
        trackElem.dispatchEvent(evt);

        expect(cursorPosition.x).toBe(647);
        expect(cursorPosition.y).toBe(31);
    });

    test('Should be x: 26 and y: 48', () => {
        let cursorPosition: ICursorPosition = { 'x': 0, 'y': 0 };
        const trackElem: HTMLDivElement = document.createElement('div');
        trackElem.classList.add('slider__track_horizontal');
        const observer: Observer = new Observer();
        observer.subscribe('clickOnTheTrack',
            (position: ICursorPosition) => { cursorPosition = position });
            
        const _this = new Track(trackElem, observer);
        
        const evt = document.createEvent('MouseEvent');
        evt.initMouseEvent('click', true, true, window, 0, 26, 48, 26, 48, false, false, false, false, 0, null)
        trackElem.dispatchEvent(evt);

        expect(cursorPosition.x).toBe(26);
        expect(cursorPosition.y).toBe(48);
    });
});