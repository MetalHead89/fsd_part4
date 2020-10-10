import {Observable} from '../slider/observable';

export class View {

    observer: Observable;
    
    constructor(observer: Observable) {
        this.observer = observer;
    }

    searchSlidersPositions():void {
        let slidersPositions: NodeListOf<HTMLElement> = 
            document.querySelectorAll('.incredible-slider-plugin');

        for (let sliderPosition of slidersPositions) {
            this.createSlider(sliderPosition)
        }
    }

    createSlider(sliderPosition: HTMLElement){
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

        slider.addEventListener('mousedown', event => { this.sliderOnMouseDown(slider, event) });

        this.observer.notify('addedNewSliderToDOM', 
            {'slider': slider, 'track': track,  'thumb': thumb});
    }

    sliderOnMouseDown(slider: HTMLElement, event: MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;

        if (target.classList.contains('slider__thumb')) {
            this.moveThumb(slider, target, event);
        }
    }

    moveThumb(slider: HTMLElement, thumb: HTMLElement, event: MouseEvent): void {

        let coords: { [index: string]: number } = this.getCoords(thumb);
        let shiftX: number = event.pageX - coords.left;

        moveAt(event);
        
        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', documentOnMouseUp);
        thumb.ondragstart = function () { return false; };

        function moveAt(event: MouseEvent) {
            thumb.style.left = event.pageX - slider.offsetLeft - shiftX + 'px';

            if (parseInt(thumb.style.left) < 0) {
                thumb.style.left = '0px';
            } else if (parseInt(thumb.style.left) > slider.offsetWidth - thumb.offsetWidth) {
                thumb.style.left = slider.offsetWidth - thumb.offsetWidth + 'px';
            }
        }

        function documentOnMouseUp() {
            document.removeEventListener('mousemove', moveAt)
            document.removeEventListener('mouseup', documentOnMouseUp)
        }
    }

    getCoords(elem: HTMLElement): { [index: string]: number } {
        let box: DOMRect = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

}

// export class View {

//     observer: Observable;
//     // slidersElements: NodeListOf<HTMLElement>;

//     constructor(observer: Observable) {
//         this.observer = observer;
//     }

//     searchSliders(): void {
//         let slidersElements: NodeListOf<HTMLElement> = document.querySelectorAll('.slider');

//         for (let slider of slidersElements) {
//             slider.addEventListener('mousedown', event => { this.sliderOnMouseDown(slider, event) });

//             this.observer.notify('newSliderFound', slider);
//         }
//     }

//     sliderOnMouseDown(slider: HTMLElement, event: MouseEvent): void {
//         const target: HTMLElement = event.target as HTMLElement;

//         if (target.classList.contains('slider__thumb')) {
//             this.moveThumb(slider, target, event);
//         }
//     }

//     moveThumb(slider: HTMLElement, thumb: HTMLElement, event: MouseEvent): void {

//         let coords: { [index: string]: number } = this.getCoords(thumb);
//         let shiftX: number = event.pageX - coords.left;

//         moveAt(event);
        
//         document.addEventListener('mousemove', moveAt);
//         document.addEventListener('mouseup', documentOnMouseUp);
//         thumb.ondragstart = function () { return false; };

//         function moveAt(event: MouseEvent) {
//             thumb.style.left = event.pageX - slider.offsetLeft - shiftX + 'px';

//             if (parseInt(thumb.style.left) < 0) {
//                 thumb.style.left = '0px';
//             } else if (parseInt(thumb.style.left) > slider.offsetWidth - thumb.offsetWidth) {
//                 thumb.style.left = slider.offsetWidth - thumb.offsetWidth + 'px';
//             }
//         }

//         function documentOnMouseUp() {
//             document.removeEventListener('mousemove', moveAt)
//             document.removeEventListener('mouseup', documentOnMouseUp)
//         }
//     }

//     getCoords(elem: HTMLElement): { [index: string]: number } {
//         let box: DOMRect = elem.getBoundingClientRect();
//         return {
//             top: box.top + pageYOffset,
//             left: box.left + pageXOffset
//         };
//     }
// }