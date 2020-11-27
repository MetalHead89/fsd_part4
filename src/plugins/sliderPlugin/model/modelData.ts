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

    getOrientation(): string {

        /**
         * Возвращает ориентацию слайдера
         * 
         * @returns {string} - ориентация слайдера
         */

        return this.orientation;

    }

    getSliderType(): string {

        /**
         * Возвращает тип слайдера
         * 
         * @returns {string} - тип слайдера
         */

        return this.type;;

    }

    getSliderSize(): ISliderSize {

        /**
         * Возвращает объект с шириной и высотой слайдера
         * 
         * @returns {ISliderSize} - объект с шириной и высотой слайдера
         */

        return this.sliderSize;

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

    getTooltipsVisible(): boolean {

        /**
         * Возвращает флаг видимости значений над бегунками
         * 
         * @returns {boolean} - флаг видимости значений над бегунками
         */

        return this.tooltipsVisible;

    }











    getMax(): number {
        return this.max;
    }
    getMin(): number {
        return this.min;
    }
    getStep(): number {
        return this.step;
    }

    getThumbSize(): IThumbSize {
        return this.thumbSize;
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