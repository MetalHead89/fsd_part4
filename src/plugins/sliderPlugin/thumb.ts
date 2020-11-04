import {IThumbShift} from './interfaces'
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
            // this.pixelsPerValue = (this.slider.getElement().clientWidth -
            //     this.thumb.getElement().clientWidth) / 100;
            this.startDrag(event.clientX, event.clientY);
            return false; // disable selection start (cursor change)
        });
    }

    getElement(): HTMLElement {
        return this.element;
    }

    private startDrag(startClientX: number, startClientY: number): void {

        const thumbCoords: DOMRect = this.element.getBoundingClientRect();
        
        this.shift.shiftX = startClientX - thumbCoords.left;
        this.shift.shiftY = startClientY - thumbCoords.top;
        
        // this.onMouseMoveHandler = this.moveTo.bind(this);
        this.onMouseUpHandler = this.endDrag.bind(this);

        document.addEventListener('mousemove',
            this.onMouseMoveHandler as EventListenerOrEventListenerObject);
        document.addEventListener('mouseup',
            this.onMouseUpHandler as EventListenerOrEventListenerObject);
                
    }

    // private getPosition() {
    //     const parrent: HTMLElement | null = this.element.parentElement;

    //     if (!parrent) {
    //         return {'left': 0, 'top': 0}
    //     }

    //     const parrentCoords: DOMRect = parrent.getBoundingClientRect();

    // }

    // private Drag() {

    //     const parrentCoords: DOMRect = this.slider.getElement().getBoundingClientRect();

    //     // вычесть координату родителя, т.к. position: relative
    //     let newLeft: number = event.clientX - this.thumb.getShiftX() - sliderCoords.left;
        
    //     // курсор ушёл вне слайдера
    //     if (newLeft < 0) {
    //         newLeft = 0;
    //     }

    //     let rightEdge: number = this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth;
        
    //     newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;

    //     if (newLeft >= rightEdge) {
    //         newLeft = rightEdge;
    //     } else {
    //         // this.stepsCount = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
    //         // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
    //         newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;


    //         // let stepCount: number = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
    //         // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / stepCount;
    //         // newLeft = Math.round(newLeft / stepSize) * stepSize;
    //     }

    //     this.progressBar?.setWidth(newLeft + this.thumb.getElement().offsetWidth);
    //     this.thumb.moveTo(newLeft);

    //     // console.log(this.positionToValue(this.thumb, newLeft))////////////////////////////////////

    // }

    private endDrag(): void {
        document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
        document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
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