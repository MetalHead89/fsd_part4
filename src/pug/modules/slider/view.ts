import { Observable } from '../slider/observable';
import { INewSliderOptions } from '../slider/interfaces';
import { ISliderComponents } from '../slider/interfaces';
import { Slider } from '../slider/slider';
import { Thumb } from './thumb';

export class View {

    observer: Observable;
    slider: Slider | null = null;
    thumb: Thumb | null = null;

    constructor(observer: Observable) {
        this.observer = observer;
    }

    createSlider(sliderOptions: INewSliderOptions) {
        const sliderComponents: ISliderComponents = this.addSliderToPage(sliderOptions.sliderPosition);

        this.slider = new Slider({
            'sliderElem': sliderComponents.sliderElem,
            'orientation': sliderOptions.settings.orienation,
            'type': sliderOptions.settings.type
        });

        this.thumb = new Thumb({
            'thumbElem': sliderComponents.thumbElem,
            'minValue': sliderOptions.settings.minValue,
            'maxValue': sliderOptions.settings.maxValue,
            'step': sliderOptions.settings.step
        });

        const thumbElem: HTMLElement = this.thumb.getElement();

        thumbElem.ondragstart = function () {
            return false;
        };

        thumbElem.onmousedown = event => {
            // this.model.startDrag(sliderElem, event.clientX, event.clientY);
            // this.model.setPixelsPerValue(sliderElem);

            // return false; // disable selection start (cursor change)
        }

    }

    private addSliderToPage(sliderPosition: HTMLElement): ISliderComponents {
        let sliderElem: HTMLElement = document.createElement('div');
        sliderElem.className = 'slider';
    
        let trackElem: HTMLElement = document.createElement('div');
        trackElem.className = 'slider__track';
    
        let thumbElem: HTMLElement = document.createElement('div');
        thumbElem.className = 'slider__thumb';
    
        sliderElem.append(trackElem);
        sliderElem.append(thumbElem);
        document.body.append(sliderElem);
        sliderPosition.replaceWith(sliderElem);

        return {'sliderElem': sliderElem, 'trackElem': trackElem, 'thumbElem': thumbElem}
    }

    startDrag(startClientX: number, startClientY: number) {
        if (this.thumb) {
            const thumbCoords: DOMRect = this.thumb.getElement().getBoundingClientRect()
            this.thumb.setShiftX(startClientX - thumbCoords.left);
            this.thumb.setShiftY(startClientY - thumbCoords.top);
        }

        if (this.slider) {
            this.slider.setCoords(this.slider.getElement().getBoundingClientRect());
        }

        
        // this.observer.notify('dragStarted', {
        //     'sliderElem': slider.element, 'thumbElem': thumb.element
        // });
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