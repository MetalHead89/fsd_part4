import { IScaleSettings } from './interfaces';

export class Scale {

    private scaleElem: HTMLElement | null;
    private segmentsCount: number = 2;
    private stepSize: number = 0;
    private displayed: boolean;

    constructor(scaleElem: HTMLElement, setings: IScaleSettings, segmentsCount: number, stepSize: number) {
        this.scaleElem = scaleElem;
        this.displayed = setings.displayed;
        this.segmentsCount = segmentsCount;
        this.stepSize = stepSize;

        this.addSegments();
    }

    private addSegments() {
        if (this.scaleElem) {
            for (let i = 0; i < this.segmentsCount; i++) {
                const segment: HTMLElement = document.createElement('div');
                segment.className = 'slider__scale-segment';
    
                this.scaleElem.append(segment);
            }
        }
    }
}