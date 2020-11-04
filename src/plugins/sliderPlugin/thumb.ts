import {IThumbShift} from './interfaces'
import {IThumbPosition} from './interfaces'
import {ICursorPsition} from './interfaces'
import { IThumbSize } from './interfaces';

import Observable from './observable';

class Thumb {
    private element: HTMLElement;
    private observer: Observable;
    private shift: IThumbShift = {'shiftX': 0, 'shiftY': 0};
    private onMouseMoveHandler: Function = () => {};
    private onMouseUpHandler: Function = () => {};

    constructor(thumbElem: HTMLElement, observer: Observable) {
        this.element = thumbElem;
        this.observer = observer;
        
        this.element.ondragstart = function () {
            return false;
        };

        this.element.addEventListener('mousedown', (event: MouseEvent) => {
            this.startDrag(event.clientX, event.clientY);
            return false; // disable selection start (cursor change)
        });
    }

    getElement(): HTMLElement {
        return this.element;
    }

    getSize(): IThumbSize {
        return {
            'width': this.element.offsetWidth,
            'height': this.element.offsetHeight
        };
    }

    private startDrag(cursorX: number, cursorY: number): void {

        const thumbCoords: DOMRect = this.element.getBoundingClientRect();
        
        this.shift.shiftX = cursorX - thumbCoords.left;
        this.shift.shiftY = cursorY - thumbCoords.top;
        
        this.onMouseMoveHandler = this.drag.bind(this);
        this.onMouseUpHandler = this.endDrag.bind(this);

        document.addEventListener('mousemove',
            this.onMouseMoveHandler as EventListenerOrEventListenerObject);
        document.addEventListener('mouseup',
            this.onMouseUpHandler as EventListenerOrEventListenerObject);

        this.observer.notify('setActiveThumb', this)
                
    }

    private drag(event: MouseEvent): void {
        this.observer.notify('startDrag', this.getPosition({'x': event.clientX, 'y': event.clientY}))
    }

    private getPosition(cursorPosition: ICursorPsition): IThumbPosition {

        const parrent: HTMLElement | null = this.element.parentElement;
        
        if (!parrent) {
            return {'left': 0, 'top': 0}
        }
        
        const parrentCoords: DOMRect = parrent.getBoundingClientRect();
        console.log(cursorPosition.x)
        return {
            'left': cursorPosition.x - this.shift.shiftX - parrentCoords.left,
            'top': cursorPosition.y - this.shift.shiftY - parrentCoords.left
        }
    }

    private endDrag(): void {
        document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
        document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
    }

    moveTo(value: number) {
        this.element.style.left = value + 'px';
    }
}

export default Thumb;










// import { IThumbSettings } from './interfaces';

// export class Thumb {
//     private element: HTMLElement;
//     private minValue: number;
//     private maxValue: number;
//     private step: number;
//     private coords: DOMRect | null = null;
//     private shiftX: number = 0;
//     private shiftY: number = 0;

//     constructor(thumbElem: HTMLElement, thumbSettings: IThumbSettings) {
//         this.element = thumbElem;
//         this.minValue = thumbSettings.minValue;
//         this.maxValue = thumbSettings.maxValue;
//         this.step = thumbSettings.step;
//     }

//     setMinValue(value: number) {
//         this.minValue = value;
//     }

//     getMinValue(): number {
//         return this.minValue;
//     }

//     setMaxValue(value: number) {
//         this.maxValue = value;
//     }

//     getMaxValue(): number {
//         return this.maxValue;
//     }

//     setStepValue(value: number) {
//         this.step = value;
//     }

//     getStep(): number {
//         return this.step;
//     }

//     getElement(): HTMLElement {
//         return this.element;
//     }

//     // setCoords(coords: DOMRect) {
//     //     this.coords = coords;
//     // }

//     // getCoords(): DOMRect | null {
//     //     return this.coords;
//     // }

//     setShiftX(shift: number) {
//         this.shiftX = shift;
//     }

//     getShiftX(): number {
//         return this.shiftX;
//     }

//     setShiftY(shift: number) {
//         this.shiftY = shift;
//     }

//     moveTo(newLeft: number) {
//         this.element.style.left = newLeft + 'px';
//     }
// }










// export class Thumb {
//     color: string = '';
//     element: HTMLElement | null;
//     minValue: number;
//     maxValue: number;
//     step: number;
//     coords: DOMRect | null = null;
//     shiftX: number = 0;
//     shiftY: number = 0;
//     pixelsPerValue: number = 0;

//     constructor(thumb: HTMLElement | null) {
//         this.element = thumb;
//         this.minValue = 10;
//         this.maxValue = 100;
//         this.step = 17;
//     }

//     getMaxValue(): number {
//         return this.maxValue;
//     }

//     getMinValue(): number {
//         return this.minValue;
//     }
// }