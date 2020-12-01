import { IThumbSize } from '../interfaces'
import { IThumbShift } from '../interfaces'
import { IThumbPosition } from '../interfaces'
import { ICursorPsition } from '../interfaces'

import Observer from '../observer/observer';

class Thumb {

    private element: HTMLDivElement;
    private observer: Observer;
    private shift: IThumbShift = { 'shiftX': 0, 'shiftY': 0 };
    private onMouseMoveHandler: Function = () => { };
    private onMouseUpHandler: Function = () => { };

    constructor(thumbElement: HTMLDivElement, observer: Observer) {

        this.element = thumbElement;
        this.observer = observer;

        this.element.ondragstart = function () {
            return false;
        };

        this.element.addEventListener('mousedown', (event: MouseEvent) => {
            this.startDrag(event.clientX, event.clientY);
            return false; // disable selection start (cursor change)
        });

    }

    getElement(): HTMLDivElement {

        /**
         * Возвращает div элемент бегунка
         * 
         * @returns {HTMLDivElement} - div элемент бегунка
         */

        return this.element
    }

    getSize(): IThumbSize {

        /**
         * Возвращает ширину и высоту бегунка
         * 
         * @returns {ISliderSize} - ширина и высота бегунка
         */

        const thumbSize: IThumbSize = {
            'width': this.element.offsetWidth,
            'height': this.element.offsetHeight
        }

        return thumbSize;

    }

    private startDrag(cursorX: number, cursorY: number): void {

        // this.setZIndex(3);
        // this.observer.notify('changeZIndexToAnotherThumb', this.element);
        this.element.style.zIndex = (+this.element.style.zIndex + 1).toString()
        
        const thumbCoords: DOMRect = this.element.getBoundingClientRect();

        this.shift.shiftX = cursorX - thumbCoords.left;
        this.shift.shiftY = cursorY - thumbCoords.top;

        this.onMouseMoveHandler = this.drag.bind(this);
        this.onMouseUpHandler = this.endDrag.bind(this);
        /////////////////////////////////////////////////////////////////////////////////////// <= Увеличить z-index, аа зетем уменьшить в endDrag()
        document.addEventListener('mousemove',
            this.onMouseMoveHandler as EventListenerOrEventListenerObject);
        document.addEventListener('mouseup',
            this.onMouseUpHandler as EventListenerOrEventListenerObject);

    }

    private drag(event: MouseEvent): void {
        
        let notifyMessage = 'thumbOneIsDragged';

        if (this.element.classList.contains('slider__thumb-two')) {
            notifyMessage = 'thumbTwoIsDragged';
        }

        this.observer.notify(notifyMessage, this.getPosition({ 'x': event.clientX, 'y': event.clientY }));

    }

    private getPosition(cursorPosition: ICursorPsition): IThumbPosition {

        const parrent: HTMLElement | null = this.element.parentElement;

        if (!parrent) {
            return { 'left': 0, 'top': 0 }
        }

        const parrentCoords: DOMRect = parrent.getBoundingClientRect();

        return {
            'left': cursorPosition.x - this.shift.shiftX - parrentCoords.left,
            'top': cursorPosition.y - this.shift.shiftY - parrentCoords.top
        }
    }

    private endDrag(): void {
        document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
        document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
        this.element.style.zIndex = (+this.element.style.zIndex - 1).toString();
    }

    moveTo(position: IThumbPosition): void {
        this.element.style.left = position.left + 'px';
        this.element.style.top = position.top + 'px';
    }

    remove(): void {
        this.element.remove();
    }

}

export default Thumb;








// import { IThumbShift } from './interfaces'
// import { IThumbPosition } from './interfaces'
// import { ICursorPsition } from './interfaces'
// import { IThumbSize } from './interfaces';

// import Observable from './observable';

// class Thumb {
//     private element: HTMLElement;
//     private observer: Observable;
//     private shift: IThumbShift = { 'shiftX': 0, 'shiftY': 0 };
//     private onMouseMoveHandler: Function = () => { };
//     private onMouseUpHandler: Function = () => { };

//     constructor(thumbElem: HTMLElement, observer: Observable, zIndex: number) {
//         this.element = thumbElem;
//         this.observer = observer;
//         this.element.style.zIndex = zIndex.toString();

//         this.element.ondragstart = function () {
//             return false;
//         };

//         this.element.addEventListener('mousedown', (event: MouseEvent) => {
//             this.startDrag(event.clientX, event.clientY);
//             return false; // disable selection start (cursor change)
//         });
//     }

//     getElement(): HTMLElement {
//         return this.element;
//     }

//     getSize(): IThumbSize {
//         return {
//             'width': this.element.offsetWidth,
//             'height': this.element.offsetHeight
//         };
//     }

//     setZIndex(value: number) {
//         this.element.style.zIndex = value.toString();
//     }

//     private startDrag(cursorX: number, cursorY: number): void {

//         this.setZIndex(3);
//         this.observer.notify('changeZIndexToAnotherThumb', this.element);

//         const thumbCoords: DOMRect = this.element.getBoundingClientRect();

//         this.shift.shiftX = cursorX - thumbCoords.left;
//         this.shift.shiftY = cursorY - thumbCoords.top;

//         this.onMouseMoveHandler = this.drag.bind(this);
//         this.onMouseUpHandler = this.endDrag.bind(this);

//         document.addEventListener('mousemove',
//             this.onMouseMoveHandler as EventListenerOrEventListenerObject);
//         document.addEventListener('mouseup',
//             this.onMouseUpHandler as EventListenerOrEventListenerObject);

//     }

//     private drag(event: MouseEvent): void {
//         let notifyMessage = 'startDragThumbOne';

//         if (this.element.classList.contains('slider__thumb-two')) {
//             notifyMessage = 'startDragThumbTwo';
//         }

//         this.observer.notify(notifyMessage, this.getPosition({ 'x': event.clientX, 'y': event.clientY }));

//         // this.observer.notify('startDrag', this.getPosition({ 'x': event.clientX, 'y': event.clientY }))
//     }

//     private getPosition(cursorPosition: ICursorPsition): IThumbPosition {

//         const parrent: HTMLElement | null = this.element.parentElement;

//         if (!parrent) {
//             return { 'left': 0, 'top': 0 }
//         }

//         const parrentCoords: DOMRect = parrent.getBoundingClientRect();

//         return {
//             'left': cursorPosition.x - this.shift.shiftX - parrentCoords.left,
//             'top': cursorPosition.y - this.shift.shiftY - parrentCoords.top
//         }
//     }

//     private endDrag(): void {
//         document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
//         document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
//     }

//     moveTo(position: IThumbPosition) {
//         this.element.style.left = position.left + 'px';
//         this.element.style.top = position.top + 'px';
//     }

//     show() {
//         this.element.classList.remove('slider__thumb_hide');
//     }

//     hide() {
//         this.element.classList.add('slider__thumb_hide');
//     }

//     setHorizontalOrientation() {
//         this.element.classList.remove('slider__thumb_vertical')
//         this.element.classList.add('slider__thumb_horizontal')
//     }

//     setVerticalOrientation() {
//         this.element.classList.remove('slider__thumb_horizontal')
//         this.element.classList.add('slider__thumb_vertical')
//     }
// }

// export default Thumb;










// // import { IThumbSettings } from './interfaces';

// // export class Thumb {
// //     private element: HTMLElement;
// //     private minValue: number;
// //     private maxValue: number;
// //     private step: number;
// //     private coords: DOMRect | null = null;
// //     private shiftX: number = 0;
// //     private shiftY: number = 0;

// //     constructor(thumbElem: HTMLElement, thumbSettings: IThumbSettings) {
// //         this.element = thumbElem;
// //         this.minValue = thumbSettings.minValue;
// //         this.maxValue = thumbSettings.maxValue;
// //         this.step = thumbSettings.step;
// //     }

// //     setMinValue(value: number) {
// //         this.minValue = value;
// //     }

// //     getMinValue(): number {
// //         return this.minValue;
// //     }

// //     setMaxValue(value: number) {
// //         this.maxValue = value;
// //     }

// //     getMaxValue(): number {
// //         return this.maxValue;
// //     }

// //     setStepValue(value: number) {
// //         this.step = value;
// //     }

// //     getStep(): number {
// //         return this.step;
// //     }

// //     getElement(): HTMLElement {
// //         return this.element;
// //     }

// //     // setCoords(coords: DOMRect) {
// //     //     this.coords = coords;
// //     // }

// //     // getCoords(): DOMRect | null {
// //     //     return this.coords;
// //     // }

// //     setShiftX(shift: number) {
// //         this.shiftX = shift;
// //     }

// //     getShiftX(): number {
// //         return this.shiftX;
// //     }

// //     setShiftY(shift: number) {
// //         this.shiftY = shift;
// //     }

// //     moveTo(newLeft: number) {
// //         this.element.style.left = newLeft + 'px';
// //     }
// // }










// // export class Thumb {
// //     color: string = '';
// //     element: HTMLElement | null;
// //     minValue: number;
// //     maxValue: number;
// //     step: number;
// //     coords: DOMRect | null = null;
// //     shiftX: number = 0;
// //     shiftY: number = 0;
// //     pixelsPerValue: number = 0;

// //     constructor(thumb: HTMLElement | null) {
// //         this.element = thumb;
// //         this.minValue = 10;
// //         this.maxValue = 100;
// //         this.step = 17;
// //     }

// //     getMaxValue(): number {
// //         return this.maxValue;
// //     }

// //     getMinValue(): number {
// //         return this.minValue;
// //     }
// // }