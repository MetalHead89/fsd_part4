import { Observable } from '../slider/observable';
import { Thumb } from './thumb';

export class View {

    observer: Observable;

    constructor(observer: Observable) {
        this.observer = observer;
    }

    searchSlidersPositions(): void {
        let slidersPositions: NodeListOf<HTMLElement> =
            document.querySelectorAll('.incredible-slider-plugin');

        for (let sliderPosition of slidersPositions) {
            this.createSlider(sliderPosition)
        }
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

    targetIsThumb(event: MouseEvent): boolean {
        const target: HTMLElement = event.target as HTMLElement;

        if (target.classList.contains('slider__thumb')) {
            return true;
        }

        return false;
    }

    moveThumb(thumbElem: HTMLElement, newLeft: number): void {
        thumbElem.style.left = newLeft + 'px';
    }


    

    // Slider(slider: HTMLElement) {
    //     const thumbElem: HTMLElement | null = slider.querySelector('.slider__thumb');

    //     let sliderCoords: any, thumbCoords: any, shiftX: any, shiftY: any;

    //     slider.ondragstart = function () {
    //         return false;
    //     };

    //     slider.onmousedown = function (event) {
    //         const target: HTMLElement = event.target as HTMLElement;

    //         if (target.classList.contains('slider__thumb')) {
    //             startDrag(event.clientX, event.clientY);
    //             return false; // disable selection start (cursor change)
    //         }
    //     }

    //     function startDrag(startClientX: number, startClientY: number) {
    //         if (thumbElem) {
    //             const thumbCoords: any = thumbElem.getBoundingClientRect();
    //             shiftX = startClientX - thumbCoords.left;
    //             shiftY = startClientY - thumbCoords.top;
    //         }

    //         sliderCoords = slider.getBoundingClientRect();

    //         document.addEventListener('mousemove', onDocumentMouseMove);
    //         document.addEventListener('mouseup', onDocumentMouseUp);
    //     }



    //     function moveTo(clientX: number) {
    //         // вычесть координату родителя, т.к. position: relative
    //         let newLeft: number = clientX - shiftX - sliderCoords.left;

    //         // курсор ушёл вне слайдера
    //         if (newLeft < 0) {
    //             newLeft = 0;
    //         }
    //         let rightEdge: number = 0;
    //         if (thumbElem) {
    //             rightEdge = slider.offsetWidth - thumbElem.offsetWidth;
    //         }
    //         if (newLeft > rightEdge) {
    //             newLeft = rightEdge;
    //         }

    //         if (thumbElem) {
    //             thumbElem.style.left = newLeft + 'px';
    //         }
    //     }

    //     function onDocumentMouseMove(e: MouseEvent) {
    //         moveTo(e.clientX);
    //     }

    //     function onDocumentMouseUp() {
    //         endDrag();
    //     }

    //     function endDrag() {
    //         document.removeEventListener('mousemove', onDocumentMouseMove);
    //         document.removeEventListener('mouseup', onDocumentMouseUp);
    //     }

    // }
}