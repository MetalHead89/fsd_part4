import { ISliderSettings } from '../interfaces';
import { ISliderSize } from '../interfaces';
import { IThumbSize } from '../interfaces';
import { IThumbPosition } from '../interfaces';
import { IScalePointSize } from '../interfaces';
import { ICursorPosition } from '../interfaces';

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


    /**
     * Устанавливает размер слайдера
     * 
     * @param {ISliderSize} sliderSize - объект с шириной и высотой слайдера 
     */
    setSliderSize(sliderSize: ISliderSize): void {
        this.data.setSliderSize(sliderSize);
    }


    /**
     * Устанавливает размер бегунка
     * 
     * @param thumbSize - объект с шириной и высотой бегунка
     */
    setThumbSize(thumbSize: IThumbSize): void {
        this.data.setThumbSize(thumbSize);
    }


    /**
     * Возвращает ориентацию слайдера
     * 
     * @returns {string} - ориентация слайдера horizontal или vertical
     */
    getSliderOrientation(): string {
        return this.data.getOrientation();
    }


    /**
     * Устанавливает ориентацию слайдера
     * 
     * @param {string} orienation - ориентация слайдера horizontal или vertical
     */
    setSliderOrientation(orienation: string): void {
        this.data.setOrientation(orienation);
    }


    /**
     * Возвращает тип слайдера
     * 
     * @returns {string} - тип слайдера single или range
     */
    getSliderType(): string {
        return this.data.getSliderType();
    }


    /**
     * Устанавливает тип слайдера
     * 
     * @param {string} sliderType - тип слайдера single или range
     */
    setSliderType(sliderType: string): void {
        this.data.setSliderType(sliderType);
    }


    /**
     * Устанавливает флаг видимости значений бегунков
     * 
     * @param {boolean} tooltipsVisible - флаг видимости значений бегунков. true - значение отображается, false - нет
     */
    setTooltipsVisible(tooltipsVisible: boolean): void {
        this.data.setTooltipsVisible(tooltipsVisible)
    }


    /**
     * Возвращает флаг видимости бегунков
     * 
     * @returns {boolean} - флаг видимости значений бегунков. true - значение отображается, false - нет
     */
    getTooltipsVisiblity(): boolean {
        return this.data.getTooltipsVisible();
    }


    /**
     * Устанавливает размер точки шкалы
     * 
     * @param {IScalePointSize} scalePointSize - объект с шириной и высотой точки шкалы
     */
    setScalePointSize(scalePointSize: IScalePointSize): void {
        this.data.setScalePointSize(scalePointSize);
    }


    /**
     * Возврацает максимальное значение слайдера
     * 
     * @returns {number} - максимальное значение слайдера
     */
    getMax(): number {
        return this.data.getMax();
    }


    /**
     * Создаёт новую шкалу и генерирует её точки со значениями
     */
    generateScale(): void {
        this.calculator.generateScale();
    }


    /**
     * Передвигает первый бегунок на новую позицию
     * 
     * @param {IThumbPosition} thumbPosition - объект с расстояниями относительно левого и верхнего края родительсого контейнера
     */
    dragthumbOne(thumbPosition: IThumbPosition): void {
        this.calculator.dragThumbOne(thumbPosition);
    }


    /**
     * Передвигает второй бегунок на новую позицию
     * 
     * @param {IThumbPosition} thumbPosition - объект с расстояниями относительно левого и верхнего края родительского контейнера
     */
    dragThumbTwo(thumbPosition: IThumbPosition): void {
        this.calculator.dragThumbTwo(thumbPosition);
    }


    /**
     * Передвигает первый бегунок на стартовую позицию
     */
    setThumbOneToStartingPosition(): void {
        this.calculator.setThumbOneToStartingPosition();
    }


    /**
     * Передвигает второй бегунок на стартовую позицию
     */
    setThumbTwoToStartingPosition(): void {
        this.calculator.setThumbTwoToStartingPosition();
    }


    /**
     * Устанавливает минимальное значение слайдера
     * 
     * @param {number} newMin - минимальное значение слайдера
     */
    setMin(newMin: number): boolean {
        return this.data.setMin(newMin);
    }


    /**
     * Возврацает минимальное значение слайдера
     * 
     * @returns {number} - минимальное значение слайдера
     */
    getMin(): number {
        return this.data.getMin();
    }


    /**
     * Устанавливает максимальное значение слайдера
     * 
     * @param {number} newMax - максимальное значение слайдера
     */
    setMax(newMax: number): boolean {
        return this.data.setMax(newMax);
    }


    /**
     * Устанавливает шаг, с которым перемещается бегунок
     * 
     * @param {number} newStep - величина шага перемещения бегунка
     */
    setStep(newStep: number): boolean {
        return this.data.setStep(newStep);
    }


    /**
     * Возвращает шаг, с которым перемещается бегунок
     * 
     * @returns {number} - величина шага перемещения бегунка
     */
    getStep(): number {
        return this.data.getStep();
    }


    /**
     * Устанавливает флаг видимости шкалы
     * 
     * @param {boolean} scaleVisible - флаг видимости шкалы. true - шкала видна, false - нет
     */
    setScaleVisibility(scaleVisible: boolean): void {
        this.data.setScaleVisible(scaleVisible);
    }


    /**
     * Возвращает флаг видимости шкалы
     * 
     * @returns {boolean} - флаг видимости шкалы. true - шкала видна, false - нет
     */
    getScaleVisiblity(): boolean {
        return this.data.getScaleVisible();
    }


    /**
     * Возвращает позицию первого бегунка
     * 
     * @returns {IThumbPosition} - объект с расстояниями относительно левого и верхнего края родительского контейнера
     */
    getThumbOnePosition(): IThumbPosition {
        return this.data.getThumbOnePosition();
    }


    /**
     * Устанавливает позицию первого бегунка
     * 
     * @param {IThumbPosition} thumbPosition - объект с расстояниями относительно левого и верхнего края родительского контейнера 
     */
    setThumbOnePosition(thumbPosition: IThumbPosition): void {
        this.data.setThumbOnePosition(thumbPosition);
    }


    /**
     * Возвращает позицию вторго бегунка
     * 
     * @param {IThumbPosition} thumbPosition - объект с расстояниями относительно левого и верхнего края родительского контейнера 
     */
    getThumbTwoPosition(): IThumbPosition {
        return this.data.getThumbTwoPosition();
    }


    /**
     * Устанавливает позицию вторго бегунка
     * 
     * @param {IThumbPosition} thumbPosition - объект с расстояниями относительно левого и верхнего края родительского контейнера 
     */
    setThumbTwoPosition(thumbPosition: IThumbPosition): void {
        this.data.setThumbTwoPosition(thumbPosition);
    }


    /**
     * Перемещает ближайший бегунок на место клика
     * 
     * @param {ICursorPosition} cursorPosition - положение курсора относительно левого и правого края родительского контейнера
     */
    moveThumbToClickPosition(cursorPosition: ICursorPosition): void {
        this.calculator.moveThumbToClickPosition(cursorPosition);
    }

}

export default Model;