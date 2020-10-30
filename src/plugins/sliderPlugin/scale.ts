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
    private divisionWidth: number = 50;

    constructor(scaleElem: HTMLElement, setings: IScaleSettings,
        divisionsCount: number, stepSize: number, thumbSize: number, pixelsPerValue: number) {
        this.scaleElem = scaleElem;
        this.displayed = setings.displayed;
        this.divisionsCount = divisionsCount;
        this.stepSize = stepSize;
        this.maxValue = setings.maxValue;
        this.minValue = setings.minValue;
        this.pixelsPerValue = pixelsPerValue;
        // this.divisionWidth = 40;

        this.scaleElem.style.height = this.markerHeight + 'px';

        // let startPosition: number = thumbSize / 2 - this.markerWidh / 2;
        // let endPosition: number = scaleElem.clientWidth - thumbSize / 2 - this.markerWidh / 2;

        this.generateScale(thumbSize);
    }

    getScaleElem(): HTMLElement | null {
        return this.scaleElem;
    }

    private generateScale(thumbSize: number) {
        let divisionPosition: number = thumbSize / 2;
        let lastDivision: HTMLElement | null = null;

        if (this.scaleElem) {
            const endPosition: number = this.scaleElem.clientWidth - thumbSize / 2;
            const endDivision: HTMLElement | null = this.addDivision(thumbSize, endPosition, lastDivision, true);

            if (endDivision) {
                this.divisionWidth = endDivision.offsetWidth;
                endDivision.style.left = endPosition - this.divisionWidth / 2 + 'px';
            }
            // if (endDivision) {
            //     const divisionLabel: HTMLElement = endDivision.children[endDivision.children.length - 1] as HTMLElement;

            //     if (divisionLabel.offsetWidth > endDivision.offsetWidth) {
            //         divisionLabel.classList.add('slider__divisionLabel_rotate');
            //         divisionLabel.style.marginLeft = this.divisionWidth / 2 + 'px';
            //         this.labelIsRotated = true;
            //     }
            // }

            for (let i = 0; i < this.divisionsCount - 1; i++) {
                lastDivision = this.addDivision(thumbSize, divisionPosition, lastDivision, false);
                divisionPosition += this.stepSize;
            }
        }
    }

    private addDivision(thumbSize: number, position: number, lastDivision: HTMLElement | null, isEndDivision: boolean): HTMLElement | null {

        if (this.scaleElem) {

            const newLeft: number = position - this.divisionWidth / 2
            
            const division: HTMLElement = document.createElement('div');
            division.className = 'slider__scale-division';

            const divisionMarker: HTMLElement = document.createElement('div')
            divisionMarker.className = ('slider__divisionMarker')
            divisionMarker.style.width = this.markerWidh + 'px';
            divisionMarker.style.height = this.markerHeight + 'px';

            const divisionLabel: HTMLElement = document.createElement('div')
            divisionLabel.className = ('slider__divisionLabel')
            divisionLabel.innerText = this.positionToValue(position - thumbSize / 2).toString();

            if (!isEndDivision) {
                division.style.width = this.divisionWidth + 'px';
                division.style.left = newLeft + 'px';
            }

            division.append(divisionMarker);
            division.append(divisionLabel);
            
            if (!(lastDivision) || newLeft - parseInt(lastDivision.style.left) >= this.divisionWidth + 10) {
                
                // Не выводить предпоследнее деление шкалы, если оно накладывается на последнее
                if (lastDivision && 
                    this.scaleElem.clientWidth - thumbSize / 2 - 
                    this.divisionWidth / 2 - newLeft < this.divisionWidth) {
                        return lastDivision;
                }
                
                this.scaleElem.append(division);

                return division;
            }
        }

        return lastDivision;
    }

    private positionToValue(position: number) {
        return Math.round(this.minValue + ((this.maxValue -
            this.minValue) / 100 * Math.round(position / this.pixelsPerValue)));
    }
}