import { Observable } from './observable';
import { INewSliderOptions } from './interfaces';
import { ISliderComponents } from './interfaces';
import { ISliderSettings } from './interfaces';
import { IThumbSettings } from './interfaces';
import { IScaleSettings } from './interfaces';
import { Slider } from './slider';
import { Track } from './track';
import { Thumb } from './thumb';
import { Scale } from './scale';

export class View {

    private observer: Observable;
    private slider: Slider | null = null;
    private track: Track | null = null;
    private thumb: Thumb | null = null;
    private scale: Scale | null = null;
    private pixelsPerValue: number = 0;
    private onMouseMoveHandler: Function | null = null;
    private onMouseUpHandler: Function | null = null;
    private stepsCount: number = 0;
    private stepSize: number = 0;

    constructor(observer: Observable) {
        this.observer = observer;
    }

    createSlider(sliderOptions: INewSliderOptions) {
        const sliderComponents: ISliderComponents = this.addSliderToPage(sliderOptions.sliderPosition);
        
        this.addSlider(sliderComponents.sliderElem, sliderOptions.settings.sliderSettings);
        this.addTrack(sliderComponents.trackElem);
        this.addThumb(sliderComponents.thumbElem, sliderOptions.settings.thumbSettings);

        this.stepsCount = this.calculateStepsNumber();
        this.stepSize = this.calculateStepSize();

        this.addScale(sliderComponents.scaleElem, sliderOptions.settings.scaleSettings);
    }

    private calculateStepsNumber(): number{
        if (this.thumb) {
            return (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
        }

        return 0;
    }

    private calculateStepSize(): number{
        if (this.thumb && this.slider) {
            return (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
        }

        return 0;
    }

    private addTrack(trackElem: HTMLElement) {
        this.track = new Track(trackElem);

        trackElem.addEventListener('click', (event) => {
            this.moveTo(event);
        })
    }

    private addSlider(sliderElem: HTMLElement, sliderSettings: ISliderSettings) {
        this.slider = new Slider(sliderElem, sliderSettings);
    }

    private addThumb(thumbElem: HTMLElement, thumbSettings: IThumbSettings) {

        this.thumb = new Thumb(thumbElem, thumbSettings);

        // const thumbElem: HTMLElement = this.thumb.getElement();

        thumbElem.ondragstart = function () {
            return false;
        };

        thumbElem.onmousedown = event => {
            if (this.slider && this.thumb) {
                this.pixelsPerValue = (this.slider.getElement().clientWidth -
                    this.thumb.getElement().clientWidth) / 100;
                
                this.startDrag(event.clientX, event.clientY);
            }            

            return false; // disable selection start (cursor change)
        }
    }

    private addScale(scaleElem: HTMLElement, scaleSettings: IScaleSettings) {
        if (this.thumb) {
            this.scale = new Scale(scaleElem, scaleSettings, Math.round(this.stepsCount + 1), this.stepSize, this.thumb.getElement().clientWidth);
            scaleElem.addEventListener('click', (event) => {
                this.moveTo(event)
            })
        }
    }

    private addSliderToPage(sliderPosition: HTMLElement): ISliderComponents {
        const sliderElem: HTMLElement = document.createElement('div');
        sliderElem.className = 'slider';
    
        const trackElem: HTMLElement = document.createElement('div');
        trackElem.className = 'slider__track';
    
        const thumbElem: HTMLElement = document.createElement('div');
        thumbElem.className = 'slider__thumb';

        const scaleElem: HTMLElement = document.createElement('div');
        scaleElem.className = 'slider__scale';
    
        sliderElem.append(trackElem);
        sliderElem.append(thumbElem);
        sliderElem.append(scaleElem);
        sliderPosition.append(sliderElem);

        return {'sliderElem': sliderElem, 'trackElem': trackElem, 'thumbElem': thumbElem, 'scaleElem': scaleElem}
    }

    private startDrag(startClientX: number, startClientY: number) {
        if (this.thumb && this.slider) {

            const thumbCoords: DOMRect = this.thumb.getElement().getBoundingClientRect();
            
            this.thumb.setShiftX(startClientX - thumbCoords.left);
            this.thumb.setShiftY(startClientY - thumbCoords.top);

            this.onMouseMoveHandler = this.moveTo.bind(this);
            this.onMouseUpHandler = this.endDrag.bind(this);

            document.addEventListener('mousemove',
                this.onMouseMoveHandler as EventListenerOrEventListenerObject);
            document.addEventListener('mouseup',
                this.onMouseUpHandler as EventListenerOrEventListenerObject);
        }
    }

    private moveTo(event: MouseEvent) {
        if (this.slider && this.thumb) {

            const sliderCoords: DOMRect = this.slider.getElement().getBoundingClientRect();

            // вычесть координату родителя, т.к. position: relative
            let newLeft: number = event.clientX - this.thumb.getShiftX() - sliderCoords.left;
            
            // курсор ушёл вне слайдера
            if (newLeft < 0) {
                newLeft = 0;
            }

            let rightEdge: number = this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth;
            
            newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;

            if (newLeft >= rightEdge) {
                newLeft = rightEdge;
            } else {
                // this.stepsCount = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
                // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / this.stepsCount;
                newLeft = Math.round(newLeft / this.stepSize) * this.stepSize;


                // let stepCount: number = (this.thumb.getMaxValue() - this.thumb.getMinValue()) / this.thumb.getStep();
                // let stepSize: number = (this.slider.getElement().offsetWidth - this.thumb.getElement().offsetWidth) / stepCount;
                // newLeft = Math.round(newLeft / stepSize) * stepSize;
            }

            this.thumb.moveTo(newLeft);

            // console.log(this.positionToValue(this.thumb, newLeft))////////////////////////////////////
        }
    }

    private endDrag(): void {
        document.removeEventListener('mousemove', this.onMouseMoveHandler as EventListenerOrEventListenerObject);
        document.removeEventListener('mouseup', this.onMouseUpHandler as EventListenerOrEventListenerObject);
    }

    changeMinValue(value: number) {
        if (this.thumb) {
            this.thumb.setMinValue(value);
        }
    }

    changeMaxValue(value: number) {
        if (this.thumb) {
            this.thumb.setMaxValue(value);
        }
    }

    changeStepValue(value: number) {
        if (this.thumb) {
            this.thumb.setStepValue(value);
        }
    }

    private positionToValue(thumb: Thumb, left: number) {
        // return (Math.round(left / thumb.pixelsPerValue));
        return Math.round(thumb.getMinValue() + ((thumb.getMaxValue() - 
            thumb.getMinValue()) / 100 * Math.round(left / this.pixelsPerValue)));
    }
}





// export class View {

//     observer: Observable;

//     constructor(observer: Observable) {
//         this.observer = observer;
//     }

//     searchSlidersPositions(): void {
//         let slidersPositions: NodeListOf<HTMLElement> =
//             document.querySelectorAll('.incredible-slider-plugin');

//         for (let sliderPosition of slidersPositions) {
//             this.createSlider(sliderPosition)
//         }
//     }

//     createSlider(sliderPosition: HTMLElement) {
//         let slider: HTMLElement = document.createElement('div');
//         slider.className = 'slider';

//         let track: HTMLElement = document.createElement('div');
//         track.className = 'slider__track';

//         let thumb: HTMLElement = document.createElement('div');
//         thumb.className = 'slider__thumb';

//         slider.append(track);
//         slider.append(thumb);
//         document.body.append(slider);
//         sliderPosition.replaceWith(slider);

//         // const sliderFunc = this.Slider(slider);

//         this.observer.notify('addedNewSliderToDOM',
//             { 'sliderElem': slider, 'trackElem': track, 'thumbElem': thumb });
//     }

//     targetIsThumb(event: MouseEvent): boolean {
//         const target: HTMLElement = event.target as HTMLElement;

//         if (target.classList.contains('slider__thumb')) {
//             return true;
//         }

//         return false;
//     }

//     moveTo(thumbElem: HTMLElement, newLeft: number): void {
//         thumbElem.style.left = newLeft + 'px';
//     }
// }