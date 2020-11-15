import { ISliderSettings } from './interfaces';
import { ISliderSize } from './interfaces';
import { IThumbSize } from './interfaces';
import { IThumbPosition } from './interfaces'
import { ICursorPsition } from './interfaces'
import { IScalePointSize } from './interfaces'
import { IProgressBarPosition } from './interfaces'

import Observable from './observable';

class Model {
    private observer: Observable;
    private orientation: string;
    private type: string;
    private scale: boolean;
    private tooltip: boolean;
    private minValue: number;
    private maxValue: number;
    private step: number
    private sliderWidth: number = 340;
    private sliderHeight: number = 20;
    private thumbWidth: number = 20;
    private thumbHeight: number = 20;
    private stepsCount: number = 0;
    private stepSize: number = 0;
    private pixelsPerValue: number = 0;
    private thumbOnePosition: IThumbPosition = { 'left': -1, 'top': -1 };
    private thumbTwoPosition: IThumbPosition = { 'left': -1, 'top': -1 };
    private scalePointSize: IScalePointSize = { 'width': 0, 'height': 0 }

    constructor(observer: Observable, settings: ISliderSettings) {
        this.observer = observer;
        this.orientation = settings.orienation;
        this.type = settings.type;
        this.scale = settings.scale;
        this.tooltip = settings.tooltip;
        this.minValue = settings.minValue;
        this.maxValue = settings.maxValue
        this.step = settings.step;
    }





    //////////////////////////////////////// Методы API ////////////////////////////////////////

    setMinValue(newValue: number): void {

        /**
         * Устанавливает минимальное значение слайдера, но только если оно меньше 
         * максимального значения
         *  
         * @param {number} newValue - новое минимальное значение слайдера
         */

        if (newValue < this.maxValue) {
            this.minValue = newValue;
            this.observer.notify('updatedMinValue', null);
        }

    }

    setMaxValue(newValue: number): void {

        /**
         * Устанавливает максимальное значение слайдера, но только если оно больше 
         * минимального значения
         *  
         * @param {number} newValue - новое максимальное значение слайдера
         */

        if (newValue > this.minValue) {
            this.maxValue = newValue;
            this.observer.notify('updatedMaxValue', null);
        }

    }

    setStep(newValue: number): void {

        /**
         * Устанавливает размер шага бегунка, но только если параметр newValue 
         * меньше количества шагов в заданном диапазоне
         * 
         * @param {number} newValue - новое значение размера шага бегунка
         */

        if (newValue < this.maxValue - this.minValue) {
            this.step = newValue;
            this.observer.notify('updatedStep', null);
        }

    }

    setScaleVisibility(flag: boolean): void {

        /**
         * Устанавливает флаг скрытия/отобажения шкалы
         * 
         * @param {boolean} flag - флаг для отображения/скрытия шкалы
         */

        this.scale = flag;
        this.observer.notify('updatedScaleFlag', null);
    }

    setTooltipsVisibility(flag: boolean): void {

        /**
         * Устанавливает флаг скрытия/отобажения значений над бегунками
         * 
         * @param {boolean} flag - флаг для отображения/скрытия значений над бегунками
         */

        this.tooltip = flag;
        this.observer.notify('updatedTooltipFlag', null);
    }

    isScale(): boolean {

         /**
         * Возвращает флаг скрытия/отображения шкалы
         * 
         * @return {boolean} Флаг скрытия/отображения шкалы
         */

        return this.getScaleFlag();
    }

    isTooltips(): boolean {

        /**
        * Возвращает флаг скрытия/отображения значений над бегунками
        * 
        * @return {boolean} Флаг скрытия/отображения значений над бегунками
        */

       return this.getTooltipFlag();
   }

   setSliderType(type: string): void {

    /**
     * Устанавливает тип слайдера
     * 
     * @param {string} type - тип слайдера (горизонтальный или вертикальный)
     */

    this.type = type;
    this.observer.notify('updatedSliderType', null);
}





    /////////////////////////// Возврат/установка значений слайдера ///////////////////////////

    setThumbOneToStartingPosition() {

        /** Устанавливает первый бегунок на стартовую позицию */

        if (this.orientation === 'horizontal') {
            if (this.type === 'single') {
                this.thumbOneDrag({
                    'left': this.sliderWidth / 2,
                    'top': 0
                });
            } else if (this.type === 'range') {
                this.thumbOneDrag({
                    'left': this.sliderWidth * 0.3,
                    'top': 0
                });
            }
        }
    }

    setThumbTwoToStartingPosition() {

        /** Устанавливает второй бегунок на стартовую позицию */

        if (this.orientation === 'horizontal') {
            this.thumbTwoDrag({
                'left': this.sliderWidth * 0.7,
                'top': 0
            });
        }
    }

    setSliderSize(size: ISliderSize): void {

        /** Устанавливает ширину и высоту слайдера */

        this.sliderWidth = size.width;
        this.sliderHeight = size.height;
    }

    setThumbSize(size: IThumbSize) {

        /** Устанавливает ширину и высоту бегунка */

        this.thumbWidth = size.width;
        this.thumbHeight = size.height;
    }

    setScalePointSize(scalePointSize: IScalePointSize) {

        /** Устанавливает размер шкалы */

        this.scalePointSize = scalePointSize;
    }

    setPixelsPerValue(): void {

        /** 
         * Устанавливает количество пикселей в единице ширины слайдера, с вычетом крайних 
         * (тупиковых) зон
         */

        this.pixelsPerValue = (this.sliderWidth - this.thumbWidth) / 100;
    }

    getMaxValue(): number {

        /** Возвращает максимальное значение слайдера */

        return this.maxValue;
    }

    getThumbOnePosition(): IThumbPosition {

        /** Возвращает позицию первого бегунка */

        return this.thumbOnePosition;
    }

    getThumbTwoPosition(): IThumbPosition {

        /** Возвращает позицию второго бегунка */

        return this.thumbTwoPosition;
    }

    getScaleFlag(): boolean {

        /**
         * Возвращает флаг скрытия/отображения шкалы
         */

        return this.scale;
    }

    getTooltipFlag(): boolean {

        /**
         * Возвращает флаг скрытия/отображения значений над бегунками
         */

        return this.tooltip;
    }





    ///////////////////////////////// Расчёт значений слайдера /////////////////////////////////

    calculateStepsCount(): void {

        /** 
         * Считает количество шагов бегунка исходя из заданных значений и величины шага
         */

        this.stepsCount = (this.maxValue - this.minValue) / this.step;
    }

    calculateStepSize(): void {

        /**
         * Считает размер одного шага бегунка в пикселях
         */

        this.stepSize = (this.sliderWidth - this.thumbWidth) / this.stepsCount;
    }

    private calculateNewThumbPosition(value: number) {

        /**
         * Высчитывает новую позицию бегунка в соответствии с заданным шагом 
         */

        return Math.round(value / this.stepSize) * this.stepSize
    }

    private positionToValue(position: number): number {

        /**
         * Возвращает значение бегунка исходя из его позиции
         */

        return Math.round(this.minValue + ((this.maxValue - this.minValue) /
            100 * Math.round(position / this.pixelsPerValue)));
    }

    private calcProgressBarPosition(): IProgressBarPosition {

        /**
         * Возвращает размер и точку начала прогрессбара в зависимости от текущего положения бегунков
         */

        const progress: IProgressBarPosition = {
            'start': { 'x': 0, 'y': 0 },
            'size': { 'width': 0, 'height': 0 }
        };

        if (this.type === 'single') {
            progress.start.x = 0;
            progress.start.y = 0;
            progress.size.width = this.thumbOnePosition.left + this.thumbWidth;
            progress.size.height = this.thumbOnePosition.top + this.thumbHeight;
        } else if (this.type === 'range') {
            progress.start.x = this.thumbOnePosition.left;
            progress.start.y = this.thumbOnePosition.top;
            progress.size.width = this.thumbTwoPosition.left - this.thumbOnePosition.left + this.thumbWidth;
            progress.size.height = this.thumbTwoPosition.top - this.thumbOnePosition.top + this.thumbHeight;
        }

        return progress;
    }





    moveThumb(cursorPosition: ICursorPsition): void {

        const position: IThumbPosition = {
            'left': cursorPosition.x,
            'top': cursorPosition.y
        }

        if (this.type === 'range' &&
            Math.abs(position.left - this.thumbOnePosition.left) >
            Math.abs(position.left - this.thumbTwoPosition.left)) {
            this.thumbTwoDrag(position)
        } else (
            this.thumbOneDrag(position)
        )
    }

    thumbOneDrag(thumbPosition: IThumbPosition) {
        if (this.type == 'range' && thumbPosition.left >= this.thumbTwoPosition.left) {
            thumbPosition = this.thumbOnePosition;
        }

        this.thumbOnePosition.left = this.thumbDrag(thumbPosition, 'thumbOneDraged');
        this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        this.observer.notify('tooltipOneDraged', this.positionToValue(this.thumbOnePosition.left));
    }

    thumbTwoDrag(thumbPosition: IThumbPosition) {
        if (this.type == 'range' && thumbPosition.left <= this.thumbOnePosition.left) {
            thumbPosition = this.thumbTwoPosition;

            if (this.orientation == 'horizontal' && thumbPosition.left < this.thumbOnePosition.left) {
                thumbPosition.left = this.sliderWidth;
            }
        }
        this.thumbTwoPosition.left = this.thumbDrag(thumbPosition, 'thumbTwoDraged');
        this.observer.notify('progressBarDraged', this.calcProgressBarPosition());
        this.observer.notify('tooltipTwoDraged', this.positionToValue(this.thumbTwoPosition.left));
    }

    private thumbDrag(thumbPosition: IThumbPosition, notyfyMessage: string): number {

        let left: number = thumbPosition.left;

        // курсор ушёл вне слайдера
        if (left < 0) {
            left = 0;
        }

        let rightEdge: number = this.sliderWidth - this.thumbWidth;

        left = this.calculateNewThumbPosition(left);

        if (left >= rightEdge) {
            left = rightEdge;
        }

        this.observer.notify(notyfyMessage, left);

        return left;

    }

    changeThumbTwoDisplay(): void {
        if (this.type === 'single') {
            this.observer.notify('hideThumbTwo', null);
        } else if (this.type === 'range') {
            this.observer.notify('showThumbTwo', null);
        }
    }

    generateScale() {
        let scalePointPosition: number = this.thumbWidth / 2 - this.scalePointSize.width / 2;
        let prevScalePointPosition: number = 0;
        const scalePointsCount = this.stepsCount + 1;

        for (let i = 0; i <= Math.round(scalePointsCount - 1); i++) {
            let pointValue: number = this.positionToValue(scalePointPosition - this.thumbWidth / 2 + this.scalePointSize.width / 2);

            if (i === 0 || this.isPointFits(scalePointPosition, prevScalePointPosition) || i === Math.round(scalePointsCount - 1)) {

                this.observer.notify('addScalePoint',
                    { 'position': scalePointPosition, 'scalePointWidth': this.scalePointSize.width, 'scalePointValue': pointValue });

                prevScalePointPosition = scalePointPosition;

            }

            scalePointPosition += this.stepSize;

            if (i === Math.round(scalePointsCount - 2)) {
                scalePointPosition = this.sliderWidth - this.thumbWidth / 2 - this.scalePointSize.width / 2;
                this.observer.notify('scaleCreated', this.scalePointSize.height);
            }
        }

    }

    private isPointFits(scalePointPosition: number, prevScalePointPosition: number): boolean {

        return (
            (scalePointPosition - prevScalePointPosition - 2 > this.scalePointSize.width) &&
            (this.sliderWidth - this.thumbWidth / 2 - this.scalePointSize.width / 2 - scalePointPosition - 2 > this.scalePointSize.width)
        );

    }

    













    // setMinValue(newValue: number) {
    //     this.observer.notify('updatedMinValue', newValue);
    // }

    // setMaxValue(newValue: number) {
    //     this.observer.notify('updatedMaxValue', newValue);
    // }

    // setStepValue(newValue: number) {
    //     this.observer.notify('updatedStepValue', newValue);
    // }

    // createNewSlider(sliderPosition: HTMLElement, settings: IPluginSettings): void {
    //     this.settings = settings;
    //     const groupedSettings: IGroupedSettings = this.splitSettingsIntoGroups(settings);        

    //     const newSliderOptions: INewSliderOptions = {
    //         'sliderPosition': sliderPosition,
    //         'settings': groupedSettings
    //     }

    //     this.observer.notify('addedNewSliderConfiguration', newSliderOptions);
    // }

    // splitSettingsIntoGroups(settings: IPluginSettings): IGroupedSettings {
    //     const thumbSettings: IThumbSettings = {
    //         'minValue': settings.minValue,
    //         'maxValue': settings.maxValue,
    //         'step': settings.step
    //     }

    //     const sliderSettings: ISliderSettings = {
    //         'orientation': settings.orienation,
    //         'type': settings.type,
    //     }

    //     const scaleSettings: IScaleSettings = {
    //         'displayed': settings.scale,
    //         'minValue': settings.minValue,
    //         'maxValue': settings.maxValue,
    //     }

    //     return {'sliderSettings': sliderSettings, 'thumbSettings': thumbSettings, 'scaleSettings': scaleSettings}
    // }
}

export default Model;






// export class Model {
//     observer: Observable;
//     sliders: Map<HTMLElement, Slider>;

//     constructor(observer: Observable) {
//         this.observer = observer;
//         this.sliders = new Map;
//     }

//     createSliderModel(sliderComponents: { [index: string]: HTMLElement }) {
//         const slider: Slider = new Slider(sliderComponents);
//         this.sliders.set(sliderComponents.sliderElem, slider);
//     }

//     getSlider(sliderElem: HTMLElement): Slider | undefined {
//         return this.sliders.get(sliderElem);
//     }

//     startDrag(sliderElem: HTMLElement, startClientX: number, startClientY: number) {
//         const slider = this.getSlider(sliderElem);
//         if (slider) {
//             const thumb: Thumb = slider.thumb;
//             if (thumb.element) {
//                 thumb.coords = thumb.element.getBoundingClientRect();
//                 thumb.shiftX = startClientX - thumb.coords.left;
//                 thumb.shiftY = startClientY - thumb.coords.top;

//                 slider.coords = sliderElem.getBoundingClientRect();
//                 this.observer.notify('dragStarted', {
//                     'sliderElem': slider.element, 'thumbElem': thumb.element
//                 });
//             }
//         }
//     }

//     moveTo(sliderElem: HTMLElement, clientX: number) {
//         const slider = this.getSlider(sliderElem);
//         if (slider) {
//             const thumb: Thumb = slider.thumb;
//             if (thumb.element && slider.coords) {
//                 // вычесть координату родителя, т.к. position: relative
//                 let newLeft: number = clientX - thumb.shiftX - slider.coords.left;
//                 // курсор ушёл вне слайдера
//                 if (newLeft < 0) {
//                     newLeft = 0;
//                 }

//                 let rightEdge: number = 0;
//                 rightEdge = sliderElem.offsetWidth - thumb.element.offsetWidth;

//                 if (newLeft > rightEdge) {
//                     newLeft = rightEdge;
//                 } else {
//                     let stepCount = (thumb.getMaxValue() - thumb.getMinValue()) / thumb.step;
//                     let stepSize = (sliderElem.offsetWidth - thumb.element.offsetWidth) / stepCount;
//                     newLeft = Math.round(newLeft / stepSize) * stepSize;
//                 }

//                 console.log(this.positionToValue(thumb, newLeft))////////////////////////////////////

//                 this.observer.notify('moveTo', { 'thumbElem': thumb.element, 'newLeft': newLeft });

//             }
//         }
//     }

//     setOnMouseMoveHadler(sliderElem: HTMLElement, handler: Function) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             slider.onMouseMoveHadler = handler;
//         }
//     }

//     getOnMouseMoveHadler(sliderElem: HTMLElement) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             return slider.onMouseMoveHadler;
//         }
//     }

//     setOnMouseUpHadler(sliderElem: HTMLElement, handler: Function) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             slider.onMouseUpHadler = handler;
//         }
//     }

//     getOnMouseUpHadler(sliderElem: HTMLElement) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider) {
//             return slider.onMouseUpHadler;
//         }
//     }

//     setPixelsPerValue(sliderElem: HTMLElement) {
//         const slider: Slider | undefined = this.getSlider(sliderElem);

//         if (slider && slider.thumb.element) {
//             slider.thumb.pixelsPerValue = (sliderElem.clientWidth -
//                 slider.thumb.element.clientWidth) / 100;
//         }
//     }

//     // valueToPosition(value: number) {
//     //     return pixelsPerValue * value;
//     //   }

//     positionToValue(thumb: Thumb, left: number) {
//         // return (Math.round(left / thumb.pixelsPerValue));
//         return Math.round(thumb.getMinValue() + ((thumb.getMaxValue() - 
//             thumb.getMinValue()) / 100 * Math.round(left / thumb.pixelsPerValue)));
//     }
// }