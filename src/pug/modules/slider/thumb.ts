import { IThumbArgs } from '../slider/interfaces';

export class Thumb {
    private element: HTMLElement;
    private minValue: Number;
    private maxValue: Number;
    private step: Number;
    private coords: DOMRect | null = null;
    private shiftX: Number = 0;
    private shiftY: Number = 0;

    constructor(thumbArgs: IThumbArgs) {
        this.element = thumbArgs.thumbElem;
        this.minValue = thumbArgs.minValue;
        this.maxValue = thumbArgs.maxValue;
        this.step = thumbArgs.step;
    }

    getElement(): HTMLElement {
        return this.element;
    }

    setCoords(coords: DOMRect) {
        this.coords = coords;
    }

    getCoords(): DOMRect | null {
        return this.coords;
    }

    setShiftX(shift: Number) {
        this.shiftX = shift;
    }

    setShiftY(shift: Number) {
        this.shiftX = shift;
    }
}


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