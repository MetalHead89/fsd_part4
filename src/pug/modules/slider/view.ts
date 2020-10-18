import { Observable } from '../slider/observable';
// import { Thumb } from './thumb';

export class View {

    observer: Observable;

    constructor(observer: Observable) {
        this.observer = observer;
    }

    createSlider(sliderPosition: HTMLElement) {
        let slider: HTMLElement = document.createElement('div');
        slider.className = 'slider';
    
        let track: HTMLElement = document.createElement('div');
        track.className = 'slider__track';
    
        let thumb: HTMLElement = document.createElement('div');
        thumb.className = 'slider__thumb';
    
        slider.append(track);
        slider.append(thumb);
        document.body.append(slider);
        sliderPosition.replaceWith(slider);
    
        // const sliderFunc = this.Slider(slider);
    
        this.observer.notify('addedNewSliderToDOM',
            { 'sliderElem': slider, 'trackElem': track, 'thumbElem': thumb });
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