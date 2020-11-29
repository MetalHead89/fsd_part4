import { ISliderSettings } from '../interfaces';
import { ISliderSize } from '../interfaces';
import { IThumbSize } from '../interfaces';
import { IThumbPosition } from '../interfaces'
import { IScalePointSize } from '../interfaces'


/**
 * Класс обеспечивает хранение данных слайдера, а так же их предоставление и безопасное изменение
 */
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
    private scalePointSize: IScalePointSize = { 'width': 0, 'height': 0 };


    constructor(settings: ISliderSettings) {
        this.orientation = settings.orienation;
        this.type = settings.type;
        this.scaleVisible = settings.scale;
        this.tooltipsVisible = settings.tooltips;
        this.min = settings.min;
        this.max = settings.max;
        this.step = settings.step;
    }


    /**
     * Устанавливает ориентацию слайдера. Если в параметре передана строка не равная "horizontal"
     * или "vertical", то значение остаётся прежним
     * 
     * @param {string} orientation - ориентация слайдера
     */
    setOrientation(orientation: string): void {
        if (orientation === 'horizontal' || orientation === 'vertical') {
            this.orientation = orientation;
        }
    }


    /**
     * Возвращает ориентацию слайдера
     * 
     * @returns {string} - ориентация слайдера
     */
    getOrientation(): string {
        return this.orientation;
    }


    /**
     * Устанавливает тип слайдера. Если в параметре передана строка не равная "single"
     * или "range", то значение остаётся прежним
     * 
     * @param {string} type - ориентация слайдера
     */
    setSliderType(type: string): void {
        if (type === 'single' || type === 'range') {
            this.type = type;
        }
    }


    /**
     * Возвращает тип слайдера
     * 
     * @returns {string} - тип слайдера
     */
    getSliderType(): string {
        return this.type;
    }


    /**
     * Устанавливает ширину и высоту слайдера. Отрицательные значения приравниваются к 0
     * 
     * @param {ISliderSize} sliderSize - объект с шириной и высотой слайдера
     */
    setSliderSize(sliderSize: ISliderSize): void {
        const width: number = (sliderSize.width >= 0) ? sliderSize.width : 0;
        const height: number = (sliderSize.height >= 0) ? sliderSize.height : 0;

        this.sliderSize = { 'width': width, 'height': height };
    }


    /**
     * Возвращает объект с шириной и высотой слайдера
     * 
     * @returns {ISliderSize} - объект с шириной и высотой слайдера
     */
    getSliderSize(): ISliderSize {
        return this.sliderSize;
    }


    /**
     * Устанавливает ширину и высоту бегунка. Отрицательные значения приравниваются к 0
     * 
     * @param {IThumbSize} thumbSize - объект с шириной и высотой бегунка
     */
    setThumbSize(thumbSize: IThumbSize): void {
        const width: number = (thumbSize.width >= 0) ? thumbSize.width : 0;
        const height: number = (thumbSize.height >= 0) ? thumbSize.height : 0;

        this.thumbSize = { 'width': width, 'height': height };
    }


    /**
     * Возвращает объект с шириной и высотой бегунка
     * 
     * @returns {ISliderSize} - объект с шириной и высотой бегунка
     */
    getThumbSize(): ISliderSize {
        return this.thumbSize;
    }


    /**
     * Устанавливает флаг видимости значений над бегунками
     * 
     * @param {boolean} visible - флаг видимости значений над бегунками
     */
    setTooltipsVisible(visible: boolean): void {
        this.tooltipsVisible = visible;
    }


    /**
     * Возвращает флаг видимости значений над бегунками
     * 
     * @returns {boolean} - флаг видимости значений над бегунками
     */
    getTooltipsVisible(): boolean {
        return this.tooltipsVisible;
    }


    /**
     * Устанавливает минимальное значение. Если новое значение превышает максимальное, то оно не устанавливается
     * 
     * @param {number} newMin - новое минимальное значение слайдера
     */
    setMin(newMin: number): void {
        if (newMin <= this.max) {
            this.min = newMin;
        }
    }


    /**
     * Возвращает минимальное значение
     * 
     * @returns {number} - минимальное значение слайдера
     */
    getMin(): number {
        return this.min;
    }


    /**
     * Устанавливает максимальное значение. Если новое значение меньше минимального, то оно не устанавливается
     * 
     * @param {number} newMax - новое максимальное значение слайдера
     */
    setMax(newMax: number): void {
        if (newMax >= this.min) {
            this.max = newMax;
        }
    }


    /**
     * Возвращает максимальное значение
     * 
     * @returns {number} - максимальное значение слайдера
     */
    getMax(): number {
        return this.max;
    }


    /**
     * Устанавливает шаг бегунка. Если шаг отрицательный или равен 0, то он не устанавливается
     * 
     * @param {number} newStep - новое значение шага слайдера
     */
    setStep(newStep: number): void {
        if (newStep > 0) {
            this.step = newStep;
        }
    }


    /**
     * Возвращает максимальное значение
     * 
     * @returns {number} - максимальное значение слайдера
     */
    getStep(): number {
        return this.step;
    }


    /**
     * Устанавливает позицию бегунка относительно левого и верхнего края родительского контейнера.
     * Если одно из свойств переданного объекта больше соответствующего свойства второго бегунка, то оно остаётся неизменным
     * Если одно из свойств переданного объекта имеет отрицательное значение, то оно приравнивается к 0
     * 
     * @param {IThumbPosition} position - объект содержащий новую позицию бегунка относительно левого и правого края родительского контейнера
     */
    setThumbOnePosition(position: IThumbPosition): void {
        let left: number = this.getThumbOnePosition().left;
        let top: number = this.getThumbOnePosition().top;

        if (position.left <= this.getThumbTwoPosition().left) {
            left = (position.left >= 0) ? position.left : 0;
        };
        if (position.top <= this.getThumbTwoPosition().top) {
            top = (position.top >= 0) ? position.top : 0;
        };

        this.thumbOnePosition = { 'left': left, 'top': top };
    }


    /**
     * Возвращает позицию бегунка относительно левого и верхнего края родительского контейнера
     * 
     * @returns {IThumbPosition} - объект содержащий позицию бегунка относительно левого и правого края родительского контейнера
     */
    getThumbOnePosition(): IThumbPosition {
        return this.thumbOnePosition;
    }


    /**
     * Устанавливает позицию бегунка относительно левого и верхнего края родительского контейнера.
     * Если одно из свойств переданного объекта меньше соответствующего свойства первого бегунка, то оно остаётся неизменным
     * Если одно из свойств переданного объекта превышает максимально возможную позицию бегунка, ограниченную размерами слайдера,
     * то оно приравнивается к соответствующему свойству последней корректной позиции
     * 
     * @param {IThumbPosition} position - объект содержащий новую позицию бегунка относительно левого и правого края родительского контейнера
     */
    setThumbTwoPosition(position: IThumbPosition): void {
        let left: number = this.getThumbTwoPosition().left;
        let top: number = this.getThumbTwoPosition().top;

        if (position.left >= this.getThumbOnePosition().left) {
            left = (position.left <= (this.getSliderSize().width - this.getThumbSize().width)) ? position.left : (this.getSliderSize().width - this.getThumbSize().width);
        };
        if (position.top >= this.getThumbOnePosition().top) {
            top = (position.top <= (this.getSliderSize().height - this.getThumbSize().height)) ? position.top : (this.getSliderSize().height - this.getThumbSize().height);
        };

        this.thumbTwoPosition = { 'left': left, 'top': top };
    }


    /**
    * Возвращает позицию бегунка относительно левого и верхнего края родительского контейнера
    * 
    * @returns {IThumbPosition} - объект содержащий позицию бегунка относительно левого и правого края родительского контейнера
    */
    getThumbTwoPosition(): IThumbPosition {
        return this.thumbTwoPosition;
    }

    setScalePointSize(scalePointSize: IScalePointSize) {
        this.scalePointSize = scalePointSize;
    }

    getScalePointSize(): IScalePointSize {
        return this.scalePointSize;
    }

}

export default ModelData;