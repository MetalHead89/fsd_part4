import { IThumbOptions } from '../slider/interfaces';

export class Thumb {
    private color: string = '';
    private element: HTMLElement;
    private minValue: Number;
    private maxValue: Number;
    private step: Number;

    constructor(thumbOptions: IThumbOptions) {
        this.element = thumbOptions.element;
        this.minValue = thumbOptions.minValue;
        this.maxValue = thumbOptions.maxValue;
        this.step = thumbOptions.step;
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