import { ISliderSettings } from '../interfaces';
import { ISliderSize } from '../interfaces';
import { IThumbSize } from '../interfaces'
import { IThumbPosition } from '../interfaces'
import { IScalePointSize } from '../interfaces'

import Observer from '../observer/observer';
import ModelCalculator from './modelCalculator';
import ModelData from './modelData';


/**
 * Класс отвечающий за бизнес логику слайдера. Разделён на 2 подкласса:
 * - ModelData - хранит в себе данные и настройки слайдера, но не содерит каких-либо расчётов;
 * - ModelCalculator - содержит логику расчёта данных, отвечающих за различные аспекты работы слайдера,
 * например вычисление положений бегунков или размера прогресс бара
 */
class Model {

    private observer: Observer;
    private data: ModelData;
    private calculator: ModelCalculator

    constructor(observer: Observer, settings: ISliderSettings) {

        this.observer = observer;
        this.data = new ModelData(settings);
        this.calculator = new ModelCalculator(this.observer, this.data);

    }


    /** Устанавливает размер слайдера */
    setSliderSize(sliderSize: ISliderSize): void {
        this.data.setSliderSize(sliderSize);
    }


    /** Устанавливает размер бегунка */
    setThumbSize(thumbSize: IThumbSize): void {
        this.data.setThumbSize(thumbSize);
    }


    /** Возвращает ориентацию слайдера */
    getSliderOrientation(): string {
        return this.data.getOrientation();
    }


    /** Устанавливает ориентацию слайдера */
    setSliderOrientation(orienation: string): void {
        this.data.setOrientation(orienation);
    }


    /** Возвращает тип слайдера */
    getSliderType(): string {
        return this.data.getSliderType();
    }


    /** Устанавливает тип слайдера */
    setSliderType(sliderType: string): void {
        this.data.setSliderType(sliderType);
    }


    /** Устанавливает флаг видимости значений бегунков */
    setTooltipsVisible(tooltipsVisible: boolean): void {
        this.data.setTooltipsVisible(tooltipsVisible)
    }


    /** Возвращает флаг видимости бегунков */
    getTooltipsVisiblity(): boolean {
        return this.data.getTooltipsVisible();
    }


    /** Устанавливает размер точки слайдера */
    setScalePointSize(scalePointSize: IScalePointSize) {
        this.data.setScalePointSize(scalePointSize);
    }


    /** Возврацает максимальное значение слайдера */
    getMax(): number {
        return this.data.getMax();
    }


    /** Создаёт новую шкалу и генерирует её точки со значениями */
    generateScale() {
        this.calculator.generateScale();
    }


    /** Передвигает первый бегунок на новую позицию */
    dragthumbOne(thumbPosition: IThumbPosition) {
        this.calculator.dragThumbOne(thumbPosition);
    }


    /** Передвигает второй бегунок на новую позицию */
    dragThumbTwo(thumbPosition: IThumbPosition) {
        this.calculator.dragThumbTwo(thumbPosition);
    }


    /** Передвигает первый бегунок на стартовую позицию */
    setThumbOneToStartingPosition() {
        this.calculator.setThumbOneToStartingPosition();
    }


    /** Передвигает второй бегунок на стартовую позицию */
    setThumbTwoToStartingPosition() {
        this.calculator.setThumbTwoToStartingPosition();
    }


    /** Устанавливает минимальное значение слайдера */
    setMin(newMin: number): boolean {
        return this.data.setMin(newMin);
    }


    /** Устанавливает максимальное значение слайдера */
    setMax(newMax: number): boolean {
        return this.data.setMax(newMax);
    }


    /** Устанавливает шаг, с которым перемещается бегунок */
    setStep(newStep: number): boolean {
        return this.data.setStep(newStep);
    }


    /** Устанавливает флаг видимости шкалы */
    setScaleVisibility(scaleVisible: boolean) {
        this.data.setScaleVisible(scaleVisible);
    }


    /** Возврацает флаг видимости шкалы */
    getScaleVisiblity(): boolean {
        return this.data.getScaleVisible();
    }


    /** Возвращает позицию первого бегунка */
    getThumbOnePosition(): IThumbPosition {
        return this.data.getThumbOnePosition();
    }


    /** Устанавливает позицию первого бегунка */
    setThumbOnePosition(thumbPosition: IThumbPosition): void {
        this.data.setThumbOnePosition(thumbPosition);
    }


    /** Возвращает позицию второго бегунка */
    getThumbTwoPosition(): IThumbPosition {
        return this.data.getThumbTwoPosition();
    }


    /** Устанавливает позицию второго бегунка */
    setThumbTwoPosition(thumbPosition: IThumbPosition): void {
        this.data.setThumbTwoPosition(thumbPosition);
    }

}

export default Model;

    // getOrientation(): string {

    //     /**
    //      * Возвращает ориентацию слайдера
    //      * 
    //      * @returns {string} - ориентация слайдера
    //      */

    //     return this.orientation;

    // }

    // getSliderType(): string {

    //     /**
    //      * Возвращает тип слайдера
    //      * 
    //      * @returns {string} - тип слайдера
    //      */

    //     return this.type;;

    // }

    // getSliderSize(): ISliderSize {

    //     /**
    //      * Возвращает объект с шириной и высотой слайдера
    //      * 
    //      * @returns {ISliderSize} - объект с шириной и высотой слайдера
    //      */

    //     return this.sliderSize;

    // }

    // setSliderSize(sliderSize: ISliderSize): void {

    //     /**
    //      * Устанавливает ширину и высоту слайдера. Отрицательные значения приравниваются к 0
    //      * 
    //      * @param {ISliderSize} sliderSize - объект с шириной и высотой слайдера
    //      */

    //     const width: number = (sliderSize.width >= 0) ? sliderSize.width : 0;
    //     const height: number = (sliderSize.height >= 0) ? sliderSize.height : 0;

    //     this.sliderSize = { 'width': width, 'height': height };

    // }

    // setThumbSize(thumbSize: IThumbSize): void {

    //     /**
    //      * Устанавливает ширину и высоту бегунка. Отрицательные значения приравниваются к 0
    //      * 
    //      * @param {IThumbSize} thumbSize - объект с шириной и высотой бегунка
    //      */

    //     const width: number = (thumbSize.width >= 0) ? thumbSize.width : 0;
    //     const height: number = (thumbSize.height >= 0) ? thumbSize.height : 0;

    //     this.thumbSize = { 'width': width, 'height': height };

    // }

    // getTooltipsVisible(): boolean {

    //     /**
    //      * Возвращает флаг видимости значений над бегунками
    //      * 
    //      * @returns {boolean} - флаг видимости значений над бегунками
    //      */

    //     return this.tooltipsVisible;

    // }











// import { ISliderSettings } from './interfaces';
// import { ISliderSize } from './interfaces';
// import { IThumbSize } from './interfaces';
// import { IThumbPosition } from './interfaces'
// import { ICursorPsition } from './interfaces'
// import { IScalePointSize } from './interfaces'
// import { IProgressBarPosition } from './interfaces'

// import Observable from './observable';

// class Model {
//     private observer: Observable;
//     private orientation: string;
//     private type: string;
//     private scale: boolean;
//     private tooltip: boolean;
//     private minValue: number;
//     private maxValue: number;
//     private step: number
//     private sliderSize: ISliderSize = { 'width': 340, 'height': 20 }
//     private thumbSize: IThumbSize = { 'width': 20, 'height': 20 };
//     private stepsCount: number = 0;
//     private stepSize: number = 0;
//     private pixelsPerValue: number = 0;
//     private thumbOnePosition: IThumbPosition = { 'left': -1, 'top': -1 };
//     private thumbTwoPosition: IThumbPosition = { 'left': -1, 'top': -1 };
//     private scalePointSize: IScalePointSize = { 'width': 0, 'height': 0 }

//     constructor(observer: Observable, settings: ISliderSettings) {
//         this.observer = observer;
//         this.orientation = settings.orienation;
//         this.type = settings.type;
//         this.scale = settings.scale;
//         this.tooltip = settings.tooltip;
//         this.minValue = settings.minValue;
//         this.maxValue = settings.maxValue
//         this.step = settings.step;
//     }





//     //////////////////////////////////////// Методы API ////////////////////////////////////////

//     setMinValue(newValue: number): void {

//         /**
//          * Устанавливает минимальное значение слайдера, но только если оно меньше 
//          * максимального значения
//          *  
//          * @param {number} newValue - новое минимальное значение слайдера
//          */

//         if (newValue < this.maxValue) {
//             this.minValue = newValue;
//             this.observer.notify('updatedMinValue', null);
//         }

//     }

//     setMaxValue(newValue: number): void {

//         /**
//          * Устанавливает максимальное значение слайдера, но только если оно больше 
//          * минимального значения
//          *  
//          * @param {number} newValue - новое максимальное значение слайдера
//          */

//         if (newValue > this.minValue) {
//             this.maxValue = newValue;
//             this.observer.notify('updatedMaxValue', null);
//         }

//     }

//     setStep(newValue: number): void {

//         /**
//          * Устанавливает размер шага бегунка, но только если параметр newValue 
//          * меньше количества шагов в заданном диапазоне
//          * 
//          * @param {number} newValue - новое значение размера шага бегунка
//          */

//         if (newValue < this.maxValue - this.minValue && newValue > 0) {
//             this.step = newValue;
//             this.observer.notify('updatedStep', null);
//         }

//     }

//     getStep(): number {

//         /**
//          * Возвращает размер шага бегунка
//          * 
//          * @returns {boolean} - размер шага бегунка
//          */

//         return this.step;

//     }

//     setScaleVisibility(flag: boolean): void {

//         /**
//          * Устанавливает флаг скрытия/отобажения шкалы
//          * 
//          * @param {boolean} flag - флаг для отображения/скрытия шкалы
//          */

//         this.scale = flag;
//         this.observer.notify('updatedScaleFlag', null);
//     }

//     setTooltipsVisibility(flag: boolean): void {

//         /**
//          * Устанавливает флаг скрытия/отобажения значений над бегунками
//          * 
//          * @param {boolean} flag - флаг для отображения/скрытия значений над бегунками
//          */

//         this.tooltip = flag;
//         this.observer.notify('updatedTooltipFlag', null);
//     }

    // getScaleVisiblity(): boolean {

    //     /**
    //     * Возвращает флаг скрытия/отображения шкалы
    //     * 
    //     * @returns {boolean} - флаг скрытия/отображения шкалы
    //     */

    //     return this.scale;
    // }

//     getTooltipsVisiblity(): boolean {

//         /**
//         * Возвращает флаг скрытия/отображения значений над бегунками
//         * 
//         * @return {boolean} - флаг скрытия/отображения значений над бегунками
//         */

//         return this.tooltip;
//     }

    // setSliderType(type: string): void {

    //     /**
    //      * Устанавливает тип слайдера
    //      * 
    //      * @param {string} type - тип слайдера (горизонтальный или вертикальный)
    //      */

    //     this.type = type;
    //     this.observer.notify('updatedSliderType', null);

    // }

//     getSliderType(): string {

//         /**
//          * Возвращает тип слайдера
//          * 
//          * @returns {string} - тип слайдера (горизонтальный или вертикальный)
//          */

//         return this.type;
//     }

//     getSliderOrientation(): string {
//         return this.orientation;
//     }

//     setSliderOrientation(orienation: string): void {
//         if (orienation !== this.orientation) {
//             this.orientation = orienation;
//             this.thumbOnePosition = { 'left': this.thumbOnePosition.top, 'top': this.thumbOnePosition.left };
//             this.thumbTwoPosition = { 'left': this.thumbTwoPosition.top, 'top': this.thumbTwoPosition.left };
//             this.observer.notify('updatedSliderOrientation', this.orientation);
//         }
//     }





//     /////////////////////////// Возврат/установка значений слайдера ///////////////////////////

//     setThumbOneToStartingPosition() {

//         /** Устанавливает первый бегунок на стартовую позицию */

//         if (this.orientation === 'horizontal') {
//             if (this.type === 'single') {
//                 this.thumbOneDrag({
//                     'left': this.sliderSize.width / 2,
//                     'top': 0
//                 });
//             } else if (this.type === 'range') {
//                 this.thumbOneDrag({
//                     'left': this.sliderSize.width * 0.3,
//                     'top': 0
//                 });
//             }
//         } else if (this.orientation === 'vertical') {
//             if (this.type === 'single') {
//                 this.thumbOneDrag({
//                     'left': 0,
//                     'top': this.sliderSize.height / 2
//                 });
//             } else if (this.type === 'range') {
//                 this.thumbOneDrag({
//                     'left': 0,
//                     'top': this.sliderSize.height * 0.3
//                 });
//             }
//         }
//     }

//     setThumbTwoToStartingPosition() {

//         /** Устанавливает второй бегунок на стартовую позицию */

//         if (this.orientation === 'horizontal') {
//             this.thumbTwoDrag({
//                 'left': this.sliderSize.width * 0.7,
//                 'top': 0
//             });
//         } else if (this.orientation === 'vertical') {
//             this.thumbTwoDrag({
//                 'left': 0,
//                 'top': this.sliderSize.height * 0.7
//             });
//         }

//     }

//     setSliderSize(size: ISliderSize): void {

//         /** Устанавливает ширину и высоту слайдера */

//         this.sliderSize = size;
//     }

//     setThumbSize(size: IThumbSize) {

//         /** Устанавливает ширину и высоту бегунка */

//         this.thumbSize = size;
//     }

    // setScalePointSize(scalePointSize: IScalePointSize) {

    //     /** Устанавливает размер шкалы */

    //     this.scalePointSize = scalePointSize;
    // }

//     setPixelsPerValue(): void {

//         /** 
//          * Устанавливает количество пикселей в единице ширины слайдера, с вычетом крайних 
//          * (тупиковых) зон
//          */

//         this.pixelsPerValue = (this.getElementSizeByOrientation(this.sliderSize) - this.getElementSizeByOrientation(this.thumbSize)) / 100;
//     }

//     getMaxValue(): number {

//         /** Возвращает максимальное значение слайдера */

//         return this.maxValue;
//     }

//     getMinValue(): number {

//         /** Возвращает минимальное значение слайдера */

//         return this.minValue;
//     }

//     getThumbOnePosition(): IThumbPosition {

//         /** Возвращает позицию первого бегунка */

//         return this.thumbOnePosition;
//     }

//     getThumbTwoPosition(): IThumbPosition {

//         /** Возвращает позицию второго бегунка */

//         return this.thumbTwoPosition;
//     }

//     getThumbSize(): IThumbSize {

//         /**
//          * Возвращает размер бегунка
//          */

//         return this.thumbSize;

//     }

//     private getElementSizeByOrientation(element: ISliderSize | IThumbSize | IScalePointSize): number {

//         if (this.orientation === 'vertical') {
//             return element.height;
//         }

//         return element.width

//     }

//     private getElementPosByOrientation(element: IThumbPosition): number {

//         if (this.orientation === 'vertical') {
//             return element.top;
//         }

//         return element.left

//     }





//     ///////////////////////////////// Расчёт значений слайдера /////////////////////////////////

//     calculateStepsCount(): void {

//         /** 
//          * Считает количество шагов бегунка исходя из заданных значений и величины шага
//          */

//         this.stepsCount = (this.maxValue - this.minValue) / this.step;
//     }

//     calculateStepSize(): void {

//         /**
//          * Считает размер одного шага бегунка в пикселях
//          */

//         this.stepSize = (this.getElementSizeByOrientation(this.sliderSize) -
//             this.getElementSizeByOrientation(this.thumbSize)) / this.stepsCount;
//     }

//     private calculateNewThumbPosition(value: number) {

//         /**
//          * Высчитывает новую позицию бегунка в соответствии с заданным шагом 
//          */

//         return Math.round(value / this.stepSize) * this.stepSize
//     }

//     private positionToValue(position: number): number {

//         /**
//          * Возвращает значение бегунка исходя из его позиции
//          */

//         return Math.round(this.minValue + ((this.maxValue - this.minValue) /
//             100 * Math.round(position / this.pixelsPerValue)));
//     }

//     private calcProgressBarPosition(): IProgressBarPosition {

//         /**
//          * Возвращает размер и точку начала прогрессбара в зависимости от текущего положения бегунков
//          */

//         const progress: IProgressBarPosition = {
//             'orientation': this.orientation,
//             'start': 0,
//             'end': 0
//         };

//         if (this.type === 'single') {
//             progress.start = 0;
//             progress.end = this.getElementPosByOrientation(this.thumbOnePosition) + this.getElementSizeByOrientation(this.thumbSize);
//         } else if (this.type === 'range') {
//             progress.start = this.getElementPosByOrientation(this.thumbOnePosition);
//             progress.end = this.getElementPosByOrientation(this.thumbTwoPosition) -
//                 this.getElementPosByOrientation(this.thumbOnePosition) + this.getElementSizeByOrientation(this.thumbSize);
//         }

//         return progress;
//     }





//     moveThumb(cursorPosition: ICursorPsition): void {

//         const position: IThumbPosition = {
//             'left': cursorPosition.x - this.thumbSize.width / 2,
//             'top': cursorPosition.y - this.thumbSize.height / 2
//         }

//         if (this.type === 'range' &&
//             Math.abs(this.getElementPosByOrientation(position) - this.getElementPosByOrientation(this.thumbOnePosition)) >
//             Math.abs(this.getElementPosByOrientation(position) - this.getElementPosByOrientation(this.thumbTwoPosition))) {
//             this.thumbTwoDrag(position)
//         } else (
//             this.thumbOneDrag(position)
//         )
//     }

//     thumbOneDrag(thumbPosition: IThumbPosition) {
//         if (this.type == 'range' &&
//             this.getElementPosByOrientation(thumbPosition) >= this.getElementPosByOrientation(this.thumbTwoPosition)) {
//             thumbPosition = this.thumbOnePosition;
//         }

//         this.thumbOnePosition = this.thumbDrag(thumbPosition, 'thumbOneDraged');
//         this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
//         this.observer.notify('tooltipOneDraged', this.positionToValue(this.getElementPosByOrientation(this.thumbOnePosition)));
//     }

//     thumbTwoDrag(thumbPosition: IThumbPosition) {
//         if (this.type == 'range' &&
//             this.getElementPosByOrientation(thumbPosition) <= this.getElementPosByOrientation(this.thumbOnePosition)) {
//             thumbPosition = this.thumbTwoPosition;

//             if (this.getElementPosByOrientation(thumbPosition) < this.getElementPosByOrientation(this.thumbOnePosition)) {
//                 if (this.orientation === 'horizontal') {
//                     thumbPosition.left = this.sliderSize.width;
//                 } else if (this.orientation === 'vertical') {
//                     thumbPosition.top = this.sliderSize.height;
//                 }
//             }
//         }
//         this.thumbTwoPosition = this.thumbDrag(thumbPosition, 'thumbTwoDraged');
//         this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
//         this.observer.notify('tooltipTwoDraged', this.positionToValue(this.getElementPosByOrientation(this.thumbTwoPosition)));
//     }

//     private thumbDrag(thumbPosition: IThumbPosition, notyfyMessage: string): IThumbPosition {

//         const newThumbPosition = Object.assign({}, thumbPosition);
//         let newPos: number = this.getElementPosByOrientation(newThumbPosition);

//         // курсор ушёл вне слайдера
//         if (newPos < 0) {
//             newPos = 0;
//         }

//         let endEdge: number = this.getElementSizeByOrientation(this.sliderSize) - this.getElementSizeByOrientation(this.thumbSize);

//         newPos = this.calculateNewThumbPosition(newPos);

//         if (newPos >= endEdge) {
//             newPos = endEdge;
//         }

//         if (this.orientation === 'horizontal') {
//             newThumbPosition.left = newPos;
//             newThumbPosition.top = 0;
//         } else if (this.orientation === 'vertical') {
//             newThumbPosition.top = newPos;
//             newThumbPosition.left = 0;
//         }

//         this.observer.notify(notyfyMessage, newThumbPosition);

//         return newThumbPosition;

//     }

//     changeThumbTwoDisplay(): void {
//         if (this.type === 'single') {
//             this.observer.notify('hideThumbTwo', null);
//         } else if (this.type === 'range') {
//             this.observer.notify('showThumbTwo', null);
//         }
//     }

//     generateScale() {
//         let scalePointPosition = this.getElementSizeByOrientation(this.thumbSize) / 2 - this.getElementSizeByOrientation(this.scalePointSize) / 2;

//         let prevScalePointPosition: number = 0;
//         const scalePointsCount = this.stepsCount + 1;

//         for (let i = 0; i <= Math.round(scalePointsCount - 1); i++) {
//             const pointValue = this.positionToValue(scalePointPosition - this.getElementSizeByOrientation(this.thumbSize) / 2
//                 + this.getElementSizeByOrientation(this.scalePointSize) / 2);

//             // if (i === 0 || this.isPointFits(scalePointPosition, prevScalePointPosition) || i === Math.round(scalePointsCount - 1)) {
//             if (i === 0 || this.isPointFits(scalePointPosition, prevScalePointPosition)) {

//                 this.observer.notify('addScalePoint',
//                     {
//                         'position': scalePointPosition, 'scalePointSize': this.getElementSizeByOrientation(this.scalePointSize),
//                         'scalePointValue': pointValue
//                     });

//                 prevScalePointPosition = scalePointPosition;

//             }

//             scalePointPosition += this.stepSize;

//             if (i === Math.round(scalePointsCount - 2)) {
//                 scalePointPosition = this.getElementSizeByOrientation(this.sliderSize)
//                     - this.getElementSizeByOrientation(this.thumbSize) / 2 - this.getElementSizeByOrientation(this.scalePointSize) / 2;

//                 if (this.orientation === 'horizontal') {
//                     this.observer.notify('scaleCreated', { 'width': this.sliderSize.width, 'height': this.scalePointSize.height });
//                 } else if (this.orientation === 'vertical') {
//                     this.observer.notify('scaleCreated', { 'width': this.scalePointSize.width, 'height': this.sliderSize.height });
//                 }
//             }
//         }

//     }

//     private isPointFits(scalePointPosition: number, prevScalePointPosition: number): boolean {

//         return (scalePointPosition - prevScalePointPosition - 2 >
//             this.getElementSizeByOrientation(this.scalePointSize));

//         // return (
//         //     (scalePointPosition - prevScalePointPosition - 2 > this.getElementSizeByOrientation(this.scalePointSize)) &&
//         //     (this.getElementSizeByOrientation(this.sliderSize) - this.getElementSizeByOrientation(this.thumbSize) / 2
//         //         - this.getElementSizeByOrientation(this.scalePointSize) / 2 - scalePointPosition - 2 > this.getElementSizeByOrientation(this.scalePointSize))
//         // );

//     }
// }

// export default Model;