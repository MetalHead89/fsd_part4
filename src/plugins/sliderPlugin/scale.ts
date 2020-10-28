import { IScaleSettings } from './interfaces';

export class Scale {

    private scaleElem: HTMLElement | null;
    private divisionsCount: number = 2;
    private stepSize: number = 0;
    private minValue: number = 1;
    private maxValue: number = 10;
    private displayed: boolean;
    private markerWidh: number = 10;
    private markerHeight: number = 10;
    private pixelsPerValue: number = 0;
    private divisionWidth: number = 10;

    constructor(scaleElem: HTMLElement, setings: IScaleSettings, 
        divisionsCount: number, stepSize: number, thumbSize: number, pixelsPerValue: number) {
            this.scaleElem = scaleElem;
            this.displayed = setings.displayed;
            this.divisionsCount = divisionsCount;
            this.stepSize = stepSize;
            this.maxValue = setings.maxValue;
            this.minValue = setings.minValue;
            this.pixelsPerValue = pixelsPerValue;
            this.divisionWidth = 20;

            this.scaleElem.style.height = this.markerHeight + 'px';

            // let startPosition: number = thumbSize / 2 - this.markerWidh / 2;
            // let endPosition: number = scaleElem.clientWidth - thumbSize / 2 - this.markerWidh / 2;

            this.addDivisions(thumbSize);
    }

    getScaleElem(): HTMLElement | null {
        return this.scaleElem;
    }

    private addDivisions(thumbSize: number) {
        if (this.scaleElem) {
            let divisionPosition: number = thumbSize / 2;
            let leftPrevElement = 0;

            let visibleDivisions: number = 1;

            if (this.divisionsCount > 10) {
                visibleDivisions = Math.ceil(this.divisionsCount / 10);
            }

            for (let i = 0; i < this.divisionsCount; i++) {
                const newLeft: number = divisionPosition - this.divisionWidth / 2;

                const division: HTMLElement = document.createElement('div');
                division.className = 'slider__scale-division';
                division.style.width = this.divisionWidth + 'px';

                const divisionMarker: HTMLElement = document.createElement('div')
                divisionMarker.className = ('slider__divisionMarker')
                divisionMarker.style.width = this.markerWidh + 'px';
                divisionMarker.style.height = this.markerHeight + 'px';
                division.style.left = newLeft + 'px';

                const divisionLabel: HTMLElement = document.createElement('div')
                divisionLabel.className = ('slider__divisionLabel')   
                divisionLabel.innerText = this.positionToValue(divisionPosition - thumbSize / 2).toString();
                console.log(divisionLabel.offsetWidth)

                division.append(divisionMarker);
                division.append(divisionLabel);

                if (i == 0 || newLeft - leftPrevElement >= this.divisionWidth + 10 || i == this.divisionsCount - 1) {
                    this.scaleElem.append(division);
                    leftPrevElement = newLeft;

                    if (divisionLabel.offsetWidth > division.offsetWidth) {
                        // divisionLabel.style.transform = "rotate(45deg)";
                        divisionLabel.classList.add('slider__divisionLabel_rotate');
                    }
                }

                if (i == this.divisionsCount - 2) {
                    divisionPosition = this.scaleElem.clientWidth - thumbSize / 2;
                } else {
                    divisionPosition += this.stepSize;
                }
            }
        }
    }

    private positionToValue(position: number) {
        return Math.round(this.minValue + ((this.maxValue - 
            this.minValue) / 100 * Math.round(position / this.pixelsPerValue)));
    }
}