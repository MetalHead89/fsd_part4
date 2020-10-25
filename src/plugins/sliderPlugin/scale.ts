import { IScaleSettings } from './interfaces';

export class Scale {

    private scaleElem: HTMLElement | null;
    private segmentsCount: number = 2;
    private stepSize: number = 0;
    private displayed: boolean;
    // private startPosition: number = 0;
    private segmentWidh: number = 10;
    private segmentHeight: number = 10;

    constructor(scaleElem: HTMLElement, setings: IScaleSettings, segmentsCount: number, stepSize: number, startPosition: number) {
        this.scaleElem = scaleElem;
        this.displayed = setings.displayed;
        this.segmentsCount = segmentsCount;
        this.stepSize = stepSize;
        // this.startPosition = startPosition - this.segmentWidh / 2;

        this.addSegments(startPosition - this.segmentWidh / 2);
    }

    private addSegments(startPosition: number) {
        if (this.scaleElem) {
            for (let i = 0; i < this.segmentsCount; i++) {
                const segment: HTMLElement = document.createElement('div');
                segment.className = 'slider__scale-segment';

                segment.style.width = this.segmentWidh + 'px';
                segment.style.height = this.segmentHeight + 'px';
                
                segment.style.left = startPosition + 'px';
                startPosition += this.stepSize;

                this.scaleElem.append(segment);
            }
            // const segment: HTMLElement = document.createElement('div');
            // segment.className = 'slider__scale-segment';
            // segment.style.width = this.segmentWidh + 'px';
            // segment.style.height = this.segmentHeight + 'px';

            // segment.style.marginLeft = this.startPosition + 'px';

            // this.scaleElem.append(segment);
        }

        // if (this.scaleElem) {
        //     for (let i = 0; i < this.segmentsCount; i++) {
        //         const segment: HTMLElement = document.createElement('div');
        //         segment.className = 'slider__scale-segment';
    
        //         this.scaleElem.append(segment);
        //     }
        // }
    }
}