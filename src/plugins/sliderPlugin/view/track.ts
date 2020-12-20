import { ICursorPosition } from '../interfaces';

import Observer from "../observer/observer";


/**
 * Класс дорожки слайдера. Содержит HTML элемент дорожки слайдера и организовывает управление им
 */
class Track {
    private element: HTMLDivElement;
    private observer: Observer;


    constructor(element: HTMLDivElement, observer: Observer) {
        this.element = element;
        this.observer = observer;
        this.addClickEventListener();
    }


    /**
     * Добавляет событие на клик по дорожке слайдера
     */
    private addClickEventListener(): void {
        this.element.addEventListener('click', this.clickToTrack.bind(this));
    }


    /**
     * Обработка клика по дорожке. Метод отправляет уведомление с координатами курсора
     * @param {MouseEvent} event - объект события клика 
     */
    private clickToTrack(event: MouseEvent): void {
        this.observer.notify('clickOnTheTrack', this.getPosition({ 'x': event.clientX, 'y': event.clientY }));
    }


    /**
     * Возвращает позицию курсора
     * 
     * @param {ICursorPosition} cursorPosition - объект с позицией курсора относительно левого и верхнего края экрана
     * 
     * @returns {ICursorPosition} - объект с позицией курсора относительно левого и верхнего края родительского контейнера
     */
    private getPosition(cursorPosition: ICursorPosition): ICursorPosition {
        const positionInsideParent: ICursorPosition = Object.assign({}, cursorPosition);
        const parrent: HTMLElement | null = this.element.parentElement;

        if (parrent !== null) {
            const parrentCoords: DOMRect = parrent.getBoundingClientRect();
            positionInsideParent.x = positionInsideParent.x - parrentCoords.left;
            positionInsideParent.y = positionInsideParent.y - parrentCoords.top;
        }

        return positionInsideParent;
    }

}

export default Track;
















// import Observable from "./observable";
// import {ICursorPosition} from './interfaces'

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

//     private getPosition(cursorPosition: ICursorPosition): ICursorPosition {

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