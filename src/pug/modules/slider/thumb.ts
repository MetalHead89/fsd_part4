export class Thumb {
    color: string = '';
    element: HTMLElement | null;
    minValue: number;
    maxValue: number;
    step: number;

    constructor(thumb: HTMLElement | null) {
        this.element = thumb;
        this.minValue = 0;
        this.maxValue = 10;
        this.step = 1;
    }
}