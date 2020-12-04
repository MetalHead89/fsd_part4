import { ICursorPsition } from '../interfaces';

import Observer from "../observer/observer";

class Track {

    private element: HTMLDivElement;
    private observer: Observer;

    constructor(sliderElement: HTMLDivElement, observer: Observer) {
        this.element = sliderElement;
        this.observer = observer

        this.element.addEventListener('click', (event) => {
            this.observer.notify('clickOnTheTrack', this.getPosition({ 'x': event.clientX, 'y': event.clientY }));
        });
    }

    private getPosition(cursorPosition: ICursorPsition): ICursorPsition {

        const parrent: HTMLElement | null = this.element.parentElement;

        if (!parrent) {
            return { 'x': 0, 'y': 0 }
        }

        const parrentCoords: DOMRect = parrent.getBoundingClientRect();

        return {
            'x': cursorPosition.x - parrentCoords.left,
            'y': cursorPosition.y - parrentCoords.top
        }
    }

}

export default Track;
















// import Observable from "./observable";
// import {ICursorPsition} from './interfaces'

// class Track {
//     private element: HTMLElement;
//     private observer: Observable;

//     constructor(trackElem: HTMLElement, observer: Observable) {
//         this.element = trackElem;
//         this.observer = observer;

        // this.element.addEventListener('click', (event) => {
        //     this.observer.notify('clickOnTheTrack', this.getPosition({'x': event.clientX, 'y': event.clientY}));
        // });
//     }

//     setHorizontalOrientation() {
//         this.element.classList.remove('slider__track_vertical')
//         this.element.classList.add('slider__track_horizontal')
//     }

//     setVerticalOrientation() {
//         this.element.classList.remove('slider__track_horizontal')
//         this.element.classList.add('slider__track_vertical')
//     }

//     private getPosition(cursorPosition: ICursorPsition): ICursorPsition {

//         const parrent: HTMLElement | null = this.element.parentElement;

//         if (!parrent) {
//             return {'x': 0, 'y': 0}
//         }

//         const parrentCoords: DOMRect = parrent.getBoundingClientRect();

//         return {
//             'x': cursorPosition.x - parrentCoords.left,
//             'y': cursorPosition.y - parrentCoords.top
//         }
//     }
// }

// export default Track;


// // export class Track {
// //     private color: string = '';
// //     private element: HTMLElement | null;

// //     constructor(track: HTMLElement | null) {
// //         this.element = track;
// //     }
// // }