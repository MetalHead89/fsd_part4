export class Thumb {
    color: string = '';
    element: HTMLElement | null;
    minValue: number;
    maxValue: number;
    step: number;
    coords: DOMRect | null = null;
    shiftX: number = 0;
    shiftY: number = 0;
    pixelsPerValue: number = 0;

    constructor(thumb: HTMLElement | null) {
        this.element = thumb;
        this.minValue = 0;
        this.maxValue = 10;
        this.step = 1;
    }

    getMaxValue(): number {
        return this.maxValue;
    }
}