import { IThumbSettings } from '../slider/interfaces';

export class Thumb {
    private element: HTMLElement;
    private minValue: number;
    private maxValue: number;
    private step: number;
    private coords: DOMRect | null = null;
    private shiftX: number = 0;
    private shiftY: number = 0;

    constructor(thumbElem: HTMLElement, thumbSettings: IThumbSettings) {
        this.element = thumbElem;
        this.minValue = thumbSettings.minValue;
        this.maxValue = thumbSettings.maxValue;
        this.step = thumbSettings.step;
    }

    getMinValue(): number {
        return this.minValue;
    }

    getMaxValue(): number {
        return this.maxValue;
    }

    getStep(): number {
        return this.step;
    }

    getElement(): HTMLElement {
        return this.element;
    }

    // setCoords(coords: DOMRect) {
    //     this.coords = coords;
    // }

    // getCoords(): DOMRect | null {
    //     return this.coords;
    // }

    setShiftX(shift: number) {
        this.shiftX = shift;
    }

    getShiftX(): number {
        return this.shiftX;
    }

    setShiftY(shift: number) {
        this.shiftY = shift;
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