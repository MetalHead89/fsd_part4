import { ISliderSettings } from '../interfaces';
import { ISliderSize } from '../interfaces';
import { IThumbSize } from '../interfaces';
import { IThumbPosition } from '../interfaces'

class ModelData {

    private orientation: string;
    private type: string;
    private scaleVisible: boolean;
    private tooltipsVisible: boolean;
    private min: number;
    private max: number;
    private step: number;
    private sliderSize: ISliderSize = { 'width': 0, 'height': 0 };
    private thumbSize: IThumbSize = { 'width': 0, 'height': 0 };
    private thumbOnePosition: IThumbPosition = { 'left': 0, 'top': 0 };
    private thumbTwoPosition: IThumbPosition = { 'left': 0, 'top': 0 };

    constructor(settings: ISliderSettings) {
        this.orientation = settings.orienation;
        this.type = settings.type;
        this.scaleVisible = settings.scale;
        this.tooltipsVisible = settings.tooltips;
        this.min = settings.min;
        this.max = settings.max;
        this.step = settings.step;
    }

    setOrientation(orientation: string): void {

        /**
         * Устанавливает ориентацию слайдера. Если в параметре передана строка не равная "horizontal"
         * или "vertical", то значение остаётся прежним
         * 
         * @param {string} orientation - ориентация слайдера
         */

        if (orientation === 'horizontal' || orientation === 'vertical') {
            this.orientation = orientation;
        }

    }

    getOrientation(): string {

        /**
         * Возвращает ориентацию слайдера
         * 
         * @returns {string} - ориентация слайдера
         */

        return this.orientation;

    }

    setSliderType(type: string): void {

        /**
         * Устанавливает тип слайдера. Если в параметре передана строка не равная "single"
         * или "range", то значение остаётся прежним
         * 
         * @param {string} type - ориентация слайдера
         */

        if (type === 'single' || type === 'range') {
            this.type = type;
        }

    }

    getSliderType(): string {

        /**
         * Возвращает тип слайдера
         * 
         * @returns {string} - тип слайдера
         */

        return this.type;

    }

    setSliderSize(sliderSize: ISliderSize): void {

        /**
         * Устанавливает ширину и высоту слайдера. Отрицательные значения приравниваются к 0
         * 
         * @param {ISliderSize} sliderSize - объект с шириной и высотой слайдера
         */

        const width: number = (sliderSize.width >= 0) ? sliderSize.width : 0;
        const height: number = (sliderSize.height >= 0) ? sliderSize.height : 0;

        this.sliderSize = { 'width': width, 'height': height };

    }

    getSliderSize(): ISliderSize {

        /**
         * Возвращает объект с шириной и высотой слайдера
         * 
         * @returns {ISliderSize} - объект с шириной и высотой слайдера
         */

        return this.sliderSize;

    }

    setThumbSize(thumbSize: IThumbSize): void {

        /**
         * Устанавливает ширину и высоту бегунка. Отрицательные значения приравниваются к 0
         * 
         * @param {IThumbSize} thumbSize - объект с шириной и высотой бегунка
         */

        const width: number = (thumbSize.width >= 0) ? thumbSize.width : 0;
        const height: number = (thumbSize.height >= 0) ? thumbSize.height : 0;

        this.thumbSize = { 'width': width, 'height': height };

    }

    getThumbSize(): ISliderSize {

        /**
         * Возвращает объект с шириной и высотой бегунка
         * 
         * @returns {ISliderSize} - объект с шириной и высотой бегунка
         */

        return this.thumbSize;

    }

    setTooltipsVisible(visible: boolean): void {

        /**
         * Устанавливает флаг видимости значений над бегунками
         * 
         * @param {boolean} visible - флаг видимости значений над бегунками
         */

        this.tooltipsVisible = visible;

    }

    getTooltipsVisible(): boolean {

        /**
         * Возвращает флаг видимости значений над бегунками
         * 
         * @returns {boolean} - флаг видимости значений над бегунками
         */

        return this.tooltipsVisible;

    }

    setMin(newMin: number): void {

        /**
         * Устанавливает минимальное значение. Если новое значение превышает максимальное, то оно не устанавливается
         * 
         * @param {number} newMin - новое минимальное значение слайдера
         */

        if (newMin <= this.max) {
            this.min = newMin;
        }

    }

    getMin(): number {

        /**
         * Возвращает минимальное значение
         * 
         * @returns {number} - минимальное значение слайдера
         */

        return this.min;

    }

    setMax(newMax: number): void {

        /**
         * Устанавливает максимальное значение. Если новое значение меньше минимального, то оно не устанавливается
         * 
         * @param {number} newMax - новое максимальное значение слайдера
         */

        if (newMax >= this.min) {
            this.max = newMax;
        }

    }

    getMax(): number {

        /**
         * Возвращает максимальное значение
         * 
         * @returns {number} - максимальное значение слайдера
         */

        return this.max;

    }

    setStep(newStep: number): void {

        /**
         * Устанавливает шаг бегунка. Если шаг отрицательный или равен 0, то он не устанавливается
         * 
         * @param {number} newStep - новое значение шага слайдера
         */

        if (newStep > 0) {
            this.step = newStep;
        }

    }

    getStep(): number {

        /**
         * Возвращает максимальное значение
         * 
         * @returns {number} - максимальное значение слайдера
         */

        return this.step;

    }





    getThumbOnePosition(): IThumbPosition {
        return this.thumbOnePosition;
    }

    getThumbTwoPosition(): IThumbPosition {
        return this.thumbTwoPosition;
    }

    setThumbOnePosition(position: IThumbPosition): void {
        this.thumbOnePosition = position;
    }

    setThumbTwoPosition(position: IThumbPosition): void {
        this.thumbTwoPosition = position;
    }
}

export default ModelData;