import { IScaleSettings } from './interfaces';

export class Scale {

    private scaleElem: HTMLElement | null;
    private divisionsCount: number = 2;
    private stepSize: number = 0;
    private displayed: boolean;
    // private startPosition: number = 0;
    private segmentWidh: number = 10;
    private segmentHeight: number = 10;

    constructor(scaleElem: HTMLElement, setings: IScaleSettings, divisionsCount: number, stepSize: number, thumbSize: number) {
        this.scaleElem = scaleElem;
        this.displayed = setings.displayed;
        this.divisionsCount = divisionsCount;
        this.stepSize = stepSize;

        this.scaleElem.style.height = this.segmentHeight + 'px';

        let startPosition: number = thumbSize / 2 - this.segmentWidh / 2;
        let endPosition: number = scaleElem.clientWidth - thumbSize / 2 - this.segmentWidh / 2;

        this.addSegments(startPosition, endPosition);
    }

    getScaleElem(): HTMLElement | null {
        return this.scaleElem;
    }

    private addSegments(startPosition: number, endPosition: number) {
        if (this.scaleElem) {
            let visibleDivisions: number = 1;

            if (this.divisionsCount > 10) {
                visibleDivisions = Math.ceil(this.divisionsCount / 10);
            }

            for (let i = 0; i < this.divisionsCount; i++) {
                const segment: HTMLElement = document.createElement('div');
                segment.className = 'slider__scale-segment';

                segment.style.width = this.segmentWidh + 'px';
                segment.style.height = this.segmentHeight + 'px';

                segment.style.left = startPosition + 'px';

                if (i == 0 || i % visibleDivisions == 0 || i == this.divisionsCount - 1) {
                    this.scaleElem.append(segment);
                }

                if (i == this.divisionsCount - 2) {
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
        //     for (let i = 0; i < this.divisionsCount; i++) {
        //         const segment: HTMLElement = document.createElement('div');
        //         segment.className = 'slider__scale-segment';

        //         this.scaleElem.append(segment);
        //     }
        // }
    }
}