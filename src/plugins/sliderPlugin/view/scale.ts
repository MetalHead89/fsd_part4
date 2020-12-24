import { IScalePointSize } from '../interfaces';
import { ICursorPosition } from '../interfaces';
import { IBorderCoords } from '../interfaces';

import Observer from "../observer/observer";


/**
 * Класс шкалы. Содержит HTML элемент шкалы и организовывает управление ею
 */
class Scale {
    private element: HTMLDivElement;
    private observer: Observer;
    private orientation: string;


    constructor(element: HTMLDivElement, observer: Observer) {
        this.element = element;
        this.observer = observer;
        this.orientation = element.classList.contains('slider__scale_vertical') ? 'vertical' : 'horizontal';
        this.addClickEventListener();
    }


    /**
     * Добавляет событие на клик по шкале
     */
    private addClickEventListener(): void {
        this.element.addEventListener('click', this.clickToScale.bind(this));
    }


    /**
     * Обработка клика по шкале. Метод отправляет уведомление с координатами курсора
     * @param {MouseEvent} event - объект события клика 
     */
    private clickToScale(event: MouseEvent): void {
        this.observer.notify('clickOnTheScale', this.getPosition({ 'x': event.clientX, 'y': event.clientY }));
    }


    /**
     * Возвращает максимальный размер точки шкалы
     * 
     * @param {IScalePointSize} maxValue - объект с шириной и высотой  последней точки шкалы
     */
    getScalePointMaxSize(maxValue: number): IScalePointSize {
        const scalePoint = this.addScalePoint(0, 0, maxValue);
        const width = scalePoint.offsetWidth;
        const height = scalePoint.offsetHeight;
        scalePoint.remove();

        return { 'width': width, 'height': height };
    }


    /**
     * Добавляет новую точку со значением на шкалу
     * 
     * @param {number} position - позиция точки со значением относительно левого или верхнего края (зависит от ориентации слайдера) родительского контейнера
     * @param {number} scalePointWidth - ширина точки шкалы
     * @param {number} pointValue - значение точки шкалы
     */
    addScalePoint(position: number, scalePointWidth: number, pointValue: number): HTMLElement {
        const scalePoint: HTMLElement = document.createElement('div');

        if (this.orientation === 'horizontal') {
            scalePoint.className = 'slider__scale-point slider__scale-point_horizontal';
        } else {
            scalePoint.className = 'slider__scale-point slider__scale-point_vertical';
        }

        if (scalePointWidth > 0) {
            scalePoint.style.width = scalePointWidth + 'px';
        }

        const divisionMarker: HTMLElement = document.createElement('div');
        divisionMarker.className = ('slider__scale-point-marker');

        const divisionLabel: HTMLElement = document.createElement('div');
        if (this.orientation === 'horizontal') {
            divisionLabel.className =
                ('slider__scale-point-label slider__scale-point-label_horizontal');
        } else {
            divisionLabel.className =
                ('slider__scale-point-label slider__scale-point-label_vertical');
        }
        divisionLabel.innerText = pointValue.toString();

        if (this.orientation === 'horizontal') {
            scalePoint.style.left = position + 'px';
        } else {
            scalePoint.style.top = position + 'px';
        }

        scalePoint.append(divisionMarker);
        scalePoint.append(divisionLabel);
        this.element.append(scalePoint);

        return scalePoint;
    }


    /**
     * Удаляет HTML элемент шкалы из DOM
     */
    remove(): void {
        this.element.remove();
    }


    /**
     * Установка высоты и ширины шкалы для того, чтобы по ней можно было совершать клики, для перемещения бегунков
     * @param {number} width - Значение ширины шкалы
     * @param {number} height - Значение высоты шкалы
     */
    setScaleSize(width: number, height: number): void {
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
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


    /**
     * Возвращает координаты границ шкалы
     * 
     * @returns {IBorderCoords} - Координаты границ шкалы
     */
    getCoords(): IBorderCoords {
        const firstPointCoords = this.element.children[0].getBoundingClientRect();
        const lastPointCoords = this.element.children[this.element.children.length - 1].getBoundingClientRect();

        return {
            'left': firstPointCoords.left,
            'top': firstPointCoords.top,
            'right': lastPointCoords.right,
            'bottom': lastPointCoords.bottom
        };
    }

}

export default Scale;











// import Observable from "./observable";
// import { ICursorPosition } from './interfaces';
// import { IScalePointSize } from './interfaces';

// class Scale {

//     private element: HTMLElement;
//     private observer: Observable;
//     private orientation: string;

//     constructor(element: HTMLElement, observer: Observable, orientation: string) {
//         this.element = element;
//         this.observer = observer;
//         this.orientation = orientation;


        // this.element.addEventListener('click', (event) => {
        //     this.observer.notify('clickOnTheScale', this.getPosition({ 'x': event.clientX, 'y': event.clientY }));
        // });
//     }

//     addScalePoint(position: number, scalePointWidth: number, pointValue: number): HTMLElement {

//         const scalePoint: HTMLElement = document.createElement('div');
//         if (this.orientation === 'horizontal') {
//             scalePoint.className = 'slider__scale-point slider__scale-point_horizontal';
//         } else if (this.orientation === 'vertical') {
//             scalePoint.className = 'slider__scale-point slider__scale-point_vertical';
//         }

//         if (scalePointWidth > 0) {
//             scalePoint.style.width = scalePointWidth + 'px';
//         }

//         const divisionMarker: HTMLElement = document.createElement('div')
//         divisionMarker.className = ('slider__scale-point-marker')

//         const divisionLabel: HTMLElement = document.createElement('div')
//         if (this.orientation === 'horizontal') {
//             divisionLabel.className = 
//                 ('slider__scale-point-label slider__scale-point-label_horizontal')
//         } else if (this.orientation === 'vertical') {
//             divisionLabel.className = 
//                 ('slider__scale-point-label slider__scale-point-label_vertical')
//         }
//         divisionLabel.innerText = pointValue.toString();

//         if (this.orientation === 'horizontal') {
//             scalePoint.style.left = position + 'px';
//         } else if (this.orientation === 'vertical') {
//             scalePoint.style.top = position + 'px';
//         }

//         scalePoint.append(divisionMarker);
//         scalePoint.append(divisionLabel);
//         this.element.append(scalePoint);

//         return scalePoint
//     }

    // getScalePointMaxSize(maxValue: number): IScalePointSize {
    //     const scalePoint = this.addScalePoint(0, 0, maxValue);
    //     const width = scalePoint.offsetWidth;
    //     const height = scalePoint.offsetHeight;
    //     scalePoint.remove();

    //     return { 'width': width, 'height': height };
    // }

//     private getPosition(cursorPosition: ICursorPosition): ICursorPosition {

//         const parrent: HTMLElement | null = this.element.parentElement;

//         if (!parrent) {
//             return { 'x': 0, 'y': 0 }
//         }

//         const parrentCoords: DOMRect = parrent.getBoundingClientRect();

//         return {
//             'x': cursorPosition.x - parrentCoords.left,
//             'y': cursorPosition.y - parrentCoords.top
//         }
//     }

    // setScaleSize(width: number, height: number): void {
    //     this.element.style.width = width + 'px';
    //     this.element.style.height = height + 'px';
    // }

//     remove() {
//         this.element.remove();
//     }

//     hide() {
//         this.element.classList.add('slider__scale_hide');
//     }

//     show() {
//         this.element.classList.remove('slider__scale_hide');
//     }

//     setHorizontalOrientation() {
//         this.element.classList.remove('slider__scale_vertical')
//         this.element.classList.add('slider__scale_horizontal')
//     }

//     setVerticalOrientation() {
//         this.element.classList.remove('slider__scale_horizontal')
//         this.element.classList.add('slider__scale_vertical')
//     }

// }

// export default Scale;


































// // import { IScaleSettings } from './interfaces';

// // export class Scale {

// //     private scaleElem: HTMLElement | null;
// //     private divisionsCount: number = 2;
// //     private stepSize: number = 0;
// //     private minValue: number = 1;
// //     private maxValue: number = 10;
// //     private displayed: boolean;
// //     private markerWidh: number = 10;
// //     private markerHeight: number = 10;
// //     private pixelsPerValue: number = 0;
// //     private divisionWidth: number = 50;

// //     constructor(scaleElem: HTMLElement, setings: IScaleSettings,
// //         divisionsCount: number, stepSize: number, thumbSize: number, pixelsPerValue: number) {
// //         this.scaleElem = scaleElem;
// //         this.displayed = setings.displayed;
// //         this.divisionsCount = divisionsCount;
// //         this.stepSize = stepSize;
// //         this.maxValue = setings.maxValue;
// //         this.minValue = setings.minValue;
// //         this.pixelsPerValue = pixelsPerValue;
// //         // this.divisionWidth = 40;

// //         this.scaleElem.style.height = this.markerHeight + 'px';

// //         // let startPosition: number = thumbSize / 2 - this.markerWidh / 2;
// //         // let endPosition: number = scaleElem.clientWidth - thumbSize / 2 - this.markerWidh / 2;

// //         this.generateScale(thumbSize);
// //     }

// //     getScaleElem(): HTMLElement | null {
// //         return this.scaleElem;
// //     }

// //     private generateScale(thumbSize: number) {
// //         let divisionPosition: number = thumbSize / 2;
// //         let lastDivision: HTMLElement | null = null;

// //         if (this.scaleElem) {
// //             const endPosition: number = this.scaleElem.clientWidth - thumbSize / 2;
// //             const endDivision: HTMLElement | null = this.addDivision(thumbSize, endPosition, lastDivision, true);

// //             if (endDivision) {
// //                 this.divisionWidth = endDivision.offsetWidth;
// //                 endDivision.style.left = endPosition - this.divisionWidth / 2 + 'px';
// //             }
// //             // if (endDivision) {
// //             //     const divisionLabel: HTMLElement = endDivision.children[endDivision.children.length - 1] as HTMLElement;

// //             //     if (divisionLabel.offsetWidth > endDivision.offsetWidth) {
// //             //         divisionLabel.classList.add('slider__divisionLabel_rotate');
// //             //         divisionLabel.style.marginLeft = this.divisionWidth / 2 + 'px';
// //             //         this.labelIsRotated = true;
// //             //     }
// //             // }

// //             for (let i = 0; i < this.divisionsCount - 1; i++) {
// //                 lastDivision = this.addDivision(thumbSize, divisionPosition, lastDivision, false);
// //                 divisionPosition += this.stepSize;
// //             }
// //         }
// //     }

// //     private addDivision(thumbSize: number, position: number, lastDivision: HTMLElement | null, isEndDivision: boolean): HTMLElement | null {

// //         if (this.scaleElem) {

// //             const newLeft: number = position - this.divisionWidth / 2

// //             const division: HTMLElement = document.createElement('div');
// //             division.className = 'slider__scale-division';

// //             const divisionMarker: HTMLElement = document.createElement('div')
// //             divisionMarker.className = ('slider__divisionMarker')
// //             divisionMarker.style.width = this.markerWidh + 'px';
// //             divisionMarker.style.height = this.markerHeight + 'px';

// //             const divisionLabel: HTMLElement = document.createElement('div')
// //             divisionLabel.className = ('slider__divisionLabel')
// //             divisionLabel.innerText = this.positionToValue(position - thumbSize / 2).toString();

// //             if (!isEndDivision) {
// //                 division.style.width = this.divisionWidth + 'px';
// //                 division.style.left = newLeft + 'px';
// //             }

// //             division.append(divisionMarker);
// //             division.append(divisionLabel);

// //             if (!(lastDivision) || newLeft - parseInt(lastDivision.style.left) >= this.divisionWidth + 10) {

// //                 // Не выводить предпоследнее деление шкалы, если оно накладывается на последнее
// //                 if (lastDivision && 
// //                     this.scaleElem.clientWidth - thumbSize / 2 - 
// //                     this.divisionWidth / 2 - newLeft < this.divisionWidth) {
// //                         return lastDivision;
// //                 }

// //                 this.scaleElem.append(division);

// //                 return division;
// //             }
// //         }

// //         return lastDivision;
// //     }

// //     private positionToValue(position: number) {
// //         return Math.round(this.minValue + ((this.maxValue -
// //             this.minValue) / 100 * Math.round(position / this.pixelsPerValue)));
// //     }
// // }