import { IScaleSettings } from './interfaces';

export class Scale {

    private scaleElem: HTMLElement | null;
    private divisionsCount: number = 2;
    private stepSize: number = 0;
    private minValue: number = 1;
    private maxValue: number = 10;
    private displayed: boolean;
    private divisionWidh: number = 10;
    private divisionHeight: number = 10;
    private pixelsPerValue: number = 0;

    constructor(scaleElem: HTMLElement, setings: IScaleSettings, 
        divisionsCount: number, stepSize: number, thumbSize: number, pixelsPerValue: number) {
            this.scaleElem = scaleElem;
            this.displayed = setings.displayed;
            this.divisionsCount = divisionsCount;
            this.stepSize = stepSize;
            this.maxValue = setings.maxValue;
            this.minValue = setings.minValue;
            this.pixelsPerValue = pixelsPerValue;

            this.scaleElem.style.height = this.divisionHeight + 'px';

            // let startPosition: number = thumbSize / 2 - this.divisionWidh / 2;
            // let endPosition: number = scaleElem.clientWidth - thumbSize / 2 - this.divisionWidh / 2;

            this.addDivisions(thumbSize);
    }

    getScaleElem(): HTMLElement | null {
        return this.scaleElem;
    }

    private addDivisions(thumbSize: number) {
        if (this.scaleElem) {
            let divisionPosition: number = thumbSize / 2;

            let visibleDivisions: number = 1;

            if (this.divisionsCount > 10) {
                visibleDivisions = Math.ceil(this.divisionsCount / 10);
            }

            for (let i = 0; i < this.divisionsCount; i++) {
                const division: HTMLElement = document.createElement('div');
                division.className = 'slider__scale-division';

                const divisionMarker: HTMLElement = document.createElement('div')
                divisionMarker.className = ('slider__divisionMarker')
                divisionMarker.style.width = this.divisionWidh + 'px';
                divisionMarker.style.height = this.divisionHeight + 'px';

                const divisionLabel: HTMLElement = document.createElement('div')
                divisionLabel.className = ('slider__divisionLabel')   
                divisionLabel.innerText = this.positionToValue(divisionPosition).toString();             

                division.append(divisionMarker);
                division.append(divisionLabel);

                if (i == 0 || i % visibleDivisions == 0 || i == this.divisionsCount - 1) {
                    this.scaleElem.append(division);
                }

                division.style.left = divisionPosition - division.clientWidth / 2 + 'px';

                if (i == this.divisionsCount - 2) {
                    divisionPosition = this.scaleElem.clientWidth - thumbSize / 2;
                } else {
                    divisionPosition += this.stepSize;
                }
            }
        }
    }

    private positionToValue(position: number) {
        console.log(this.pixelsPerValue)
        return Math.round(this.minValue + ((this.maxValue - 
            this.minValue) / 100 * Math.round(position / this.pixelsPerValue)));
    }
}