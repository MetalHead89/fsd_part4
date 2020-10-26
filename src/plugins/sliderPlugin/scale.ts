import { IScaleSettings } from './interfaces';

export class Scale {

    private scaleElem: HTMLElement | null;
    private segmentsCount: number = 2;
    private stepSize: number = 0;
    private displayed: boolean;
    // private startPosition: number = 0;
    private segmentWidh: number = 10;
    private segmentHeight: number = 10;

    constructor(scaleElem: HTMLElement, setings: IScaleSettings, segmentsCount: number, stepSize: number, thumbSize: number) {
        this.scaleElem = scaleElem;
        this.displayed = setings.displayed;
        this.segmentsCount = segmentsCount;
        this.stepSize = stepSize;
        
        let startPosition: number = thumbSize / 2 - this.segmentWidh / 2;
        let endPosition: number = scaleElem.clientWidth - thumbSize / 2 - this.segmentWidh / 2;

        this.addSegments(startPosition, endPosition);
    }

    private addSegments(startPosition: number, endPosition: number) {
        if (this.scaleElem) {
            for (let i = 0; i < this.segmentsCount; i++) {
                const segment: HTMLElement = document.createElement('div');
                segment.className = 'slider__scale-segment';

                segment.style.width = this.segmentWidh + 'px';
                segment.style.height = this.segmentHeight + 'px';
                
                segment.style.left = startPosition + 'px';

                this.scaleElem.append(segment);

                if (i == this.segmentsCount - 2) {
                    startPosition = endPosition;
                } else {
                    startPosition += this.stepSize;
                }
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