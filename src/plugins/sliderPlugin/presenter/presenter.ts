import { ISliderSettings } from '../interfaces';
import { ISliderSize } from '../interfaces'
import { IThumbSize } from '../interfaces'
import { IThumbPosition } from '../interfaces'
import { IDragThumbArgs } from '../interfaces'
import { IProgressBarPosition } from '../interfaces';
import { IScalePointSize } from '../interfaces';
import { IScalePointSettings } from '../interfaces';
import { ICursorPosition } from '../interfaces';
import { IScaleSize } from '../interfaces';

import Observer from '../observer/observer';
import Model from '../model/model';
import View from '../view/view';


/**
 * Реализует взаимодействие между Моделью и Видом. Выполняет следующие действия:
 * Реагирует на уведомления от Вида о новых событиях связанных с пользовательским вводом и передаёт данные в Модель;
 * Реагирует на уведомления от Модели о новых изменениях и передаёт данные в Вид, для изменения отображения слайдера;
 * Предоставляет методы API для внешнего управления слайдером
 */
class Presenter {
    private observer: Observer;
    private model: Model;
    private view: View;


    constructor(settings: ISliderSettings, sliderWrapper: HTMLElement) {
        this.observer = new Observer();
        this.model = new Model(this.observer, settings);
        this.view = new View(this.observer, sliderWrapper);

        this.addObserverListeners();
        this.createNewSlider();
    }


    /**
     * Подписывает наблюдателя на прослушивание уведомлений от Model и View
     */
    private addObserverListeners(): void {
        this.observer.subscribe('sliderElementIsCreated',
            (sliderSize: ISliderSize) => { this.model.setSliderSize(sliderSize) });
        this.observer.subscribe('thumbOneIsCreated',
            (thumbSize: IThumbSize) => { this.model.setThumbSize(thumbSize); });
        this.observer.subscribe('thumbOneIsDragged',
            (thumbPosition: IThumbPosition) => { this.model.dragthumbOne(thumbPosition) });
        this.observer.subscribe('thumbTwoIsDragged',
            (thumbPosition: IThumbPosition) => { this.model.dragThumbTwo(thumbPosition) });
        this.observer.subscribe('thumbOneDragged',
            (args: IDragThumbArgs) => {
                this.view.moveThumbOne(args.thumbPosition);
                this.view.tooltipOneSetValue(args.tooltipValue);
                this.view.moveTooltipOne(this.model.getTooltipPosition(args.thumbPosition));
            });
        this.observer.subscribe('thumbTwoDragged',
            (args: IDragThumbArgs) => {
                this.view.moveThumbTwo(args.thumbPosition);
                this.view.tooltipTwoSetValue(args.tooltipValue);
                this.view.moveTooltipTwo(this.model.getTooltipPosition(args.thumbPosition));
            });
        this.observer.subscribe('progressBarDraged',
            (progressBarPosition: IProgressBarPosition) => { this.view.setProgressBarPosition(progressBarPosition) });
        this.observer.subscribe('scaleIsCreated', () => {
            this.model.setScalePointSize(this.getScalePointMaxSize());
            this.model.generateScale();
        });
        this.observer.subscribe('addScalePoint',
            (pointSettings: IScalePointSettings) => { this.view.addScalePoint(pointSettings) });
        this.observer.subscribe('clickOnTheScale',
            (cursorPosition: ICursorPosition) => { this.model.moveThumbToClickPosition(cursorPosition) });
        this.observer.subscribe('clickOnTheTrack',
            (cursorPosition: ICursorPosition) => { this.model.moveThumbToClickPosition(cursorPosition) });
        this.observer.subscribe('scaleCreated',
            (scaleSize: IScaleSize) => {
                this.view.setScaleSize(scaleSize);
                this.addMarginsToSlider();
            });
        this.observer.subscribe('sliderResized', () => {
            this.view.removeSlider();
            this.createNewSlider(false);
        });
    }


    /**
     * Добавляет отступы к слайдеру. Отступы нужны для формирования размера контейнера в соответствии
     * с вложенными в него элементами с абсолютным позиционированием
     */
    private addMarginsToSlider() {
        this.view.setSliderMargins({'left': 0, 'top': 0, 'right': 0, 'bottom': 0});
        const margins = this.model.getSliderMargins(this.view.getCoordsForMargins());
        this.view.setSliderMargins(margins);
    }


    /**
     * Создаёт новый слайдер исходя из настроек, хранящихся в Model
     */
    createNewSlider(isThumbsStartPosition = true): void {
        const orientation = this.model.getSliderOrientation();

        this.view.createSlider(`slider slider_${orientation}`);
        this.view.createTrack(`slider__track slider__track_${orientation}`);
        this.view.createProgressBar(`slider__progress-bar slider__progress-bar_${orientation}`)
        this.createThumbs(orientation, isThumbsStartPosition);
        if (this.model.getScaleVisiblity()) {
            this.view.createScale(`slider__scale slider__scale_${orientation}`);
        }
    }


    /**
     * Создаёт бегунки и устанавливает их на позиции
     * @param {string} orientation - ориентация слайдера 'horizontal или 'vertical'
     * @param {boolean} isStartPosition - флаг расстановки бегунков на стартовые позиции. Если true - бегунки устанавливаются на стартовые позиции.
     * Если false - на позиции сохранённые в Модели
     */
    private createThumbs(orientation: string, isStartPosition = true): void {
        const sliderType: string = this.model.getSliderType();
        const tooltipsVisible: boolean = this.model.getTooltipsVisiblity();

        this.view.createThumbOne(`slider__thumb slider__thumb-one slider__thumb_${orientation}`);
        if (tooltipsVisible) {
            this.view.createTooltipOne(`slider__tooltip slider__tooltip_${orientation}`);
        }

        if (sliderType === 'range') {
            this.view.createThumbTwo(`slider__thumb slider__thumb-two slider__thumb_${orientation}`);
            if (tooltipsVisible) {
                this.view.createTooltipTwo(`slider__tooltip slider__tooltip_${orientation}`);
            }
            if (isStartPosition) {
                this.model.setThumbTwoToStartingPosition();
            } else {
                this.model.dragThumbTwo(this.model.getThumbTwoPosition());
            }
        }

        if (isStartPosition) {
            this.model.setThumbOneToStartingPosition();
        } else {
            this.model.dragthumbOne(this.model.getThumbOnePosition());
        }
    }


    /**
     * Возвращает размер последней точки шкалы, который является максимальным.
     * Максимальный размер точки шкалы необходим для того, чтобы все точки были одинаковыми и для избежания их наложения
     * друг на друга во время формирования шкалы
     * 
     * @returns {IScalePointSize} - объект с максимальной шириной и высотой точки шкалы
     */
    private getScalePointMaxSize(): IScalePointSize {
        const sliderMaxValue: number = this.model.getMax();
        return this.view.getScalePointMaxSize(sliderMaxValue);
    }


    /**
     * Возвращает флаг видимости шкалы
     * 
     * @returns {boolean} - флаг видимости шкалы. true - шкала видна, false - нет
     */
    getScaleVisiblity(): boolean {
        return this.model.getScaleVisiblity();
    }


    /**
     * Возвращает флаг видимости бегунков
     * 
     * @returns {boolean} - флаг видимости значений бегунков. true - значение отображается, false - нет
     */
    getTooltipsVisiblity(): boolean {
        return this.model.getTooltipsVisiblity();
    }


    /**
     * Возвращает тип слайдера
     * 
     * @returns {string} - тип слайдера single или range
     */
    getSliderType(): string {
        return this.model.getSliderType();
    }


    /**
     * Возвращает ориентацию слайдера
     * 
     * @returns {string} - ориентация слайдера horizontal или vertical
     */
    getSliderOrientation(): string {
        return this.model.getSliderOrientation();
    }


    /**
     * Возврацает минимальное значение слайдера
     * 
     * @returns {number} - минимальное значение слайдера
     */
    getSliderMinValue(): number {
        return this.model.getMin();
    }


    /**
     * Возврацает максимальное значение слайдера
     * 
     * @returns {number} - максимальное значение слайдера
     */
    getSliderMaxValue(): number {
        return this.model.getMax();
    }


    /**
     * Изменяет ориентацию слайдера
     * 
     * @param orienation - ориентация слайдера horizontal или vertical
     */
    changeSliderOrientation(orienation: string): void {
        if (orienation !== this.model.getSliderOrientation()) {
            this.model.setSliderOrientation(orienation);
            const thumbOnePosition = this.model.getThumbOnePosition();
            const thumbTwoPosition = this.model.getThumbTwoPosition();
            this.model.setThumbOnePosition({ 'left': thumbOnePosition.top, 'top': thumbOnePosition.left });
            this.model.setThumbTwoPosition({ 'left': thumbTwoPosition.top, 'top': thumbTwoPosition.left });
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Изменяет тип слайдера
     * 
     * @param {string} type - тип слайдера single или range
     */
    changeSliderType(type: string): void {
        this.view.removeThumbOne();
        this.view.removeThumbTwo();
        this.model.setSliderType(type);
        this.createThumbs(this.model.getSliderOrientation(), false);
    }


    /**
     * Изменяет минимальное значение слайдера
     * 
     * @param {number} newMin - минимальное значение 
     */
    changeMinValue(newMin: number): void {
        const valueIsSet: boolean = this.model.setMin(newMin);

        if (valueIsSet) {
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Изменяет максимальное значение слайдера
     * 
     * @param {number} newMin - максимальное значение 
     */
    changeMaxValue(newMax: number): void {
        const valueIsSet: boolean = this.model.setMax(newMax);

        if (valueIsSet) {
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Возвращает шаг, с которым перемещается бегунок
     * 
     * @returns {number} - величина шага перемещения бегунка
     */
    getSliderStep(): number {
        return this.model.getStep();
    }


    /**
     * Изменяет величину шага бегунка
     * 
     * @param {number} newStep - величина с которой перемещается бегунок 
     */
    changeStep(newStep: number): void {
        const valueIsSet: boolean = this.model.setStep(newStep);

        if (valueIsSet) {
            this.view.removeSlider();
            this.createNewSlider();
        }
    }


    /**
     * Изменяет флаг видимости шкалы
     * 
     * @param {boolean} scaleVisible - флаг видимости шкалы. true - шкала видна, false - нет
     */
    changeScaleVisibility(scaleVisible: boolean): void {
        this.model.setScaleVisibility(scaleVisible);

        if (scaleVisible) {
            this.view.createScale(`slider__scale slider__scale_${this.model.getSliderOrientation()}`);
        } else {
            this.view.removeScale();
        }
    }


    /**
     * Изменяет флаг видимости значений бегунков
     * 
     * @param {boolean} tooltipsVisible - флаг видимости значений бегунков. true - значение отображается, false - нет
     */
    changeTooltipsVisibility(tooltipsVisible: boolean): void {
        this.model.setTooltipsVisible(tooltipsVisible);

        if (tooltipsVisible) {
            this.view.removeThumbOne();
            this.view.removeThumbTwo();
            this.createThumbs(this.model.getSliderOrientation(), false);
        } else {
            this.view.removeTooltipOne();
            this.view.removeTooltipTwo();
        }
    }

}

export default Presenter;