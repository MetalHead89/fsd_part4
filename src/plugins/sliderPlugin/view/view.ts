import {
  IThumbPosition,
  ITooltipPosition,
  IProgressBarPosition,
  IScalePointSize,
  IScalePointSettings,
  IScaleSize,
  IBorderCoords,
  ICoordsForMargins,
  ISliderMargins,
} from '../interfaces';

import Observer from '../observer/observer';
import Slider from './slider';
import Track from './track';
import Thumb from './thumb';
import Tooltip from './tooltip';
import ProgressBar from './progressBar';
import Scale from './scale';
import ElementFactory from './elementFactory';

class View {
  private observer: Observer;
  private slider: Slider | null = null;
  private track: Track | null = null;
  private thumbOne: Thumb | null = null;
  private thumbTwo: Thumb | null = null;
  private tooltipOne: Tooltip | null = null;
  private tooltipTwo: Tooltip | null = null;
  private progressBar: ProgressBar | null = null;
  private scale: Scale | null = null;
  private sliderWrapper: HTMLDivElement;

  constructor(observer: Observer, sliderWrapper: HTMLElement) {
    this.observer = observer;
    this.sliderWrapper = sliderWrapper as HTMLDivElement;
    this.addWindowResizeEventListener();

    this.observer.subscribe('changeZIndexToAnotherThumb', (thumbElem: HTMLElement) => {
      if (this.thumbOne !== null && this.thumbTwo !== null) {
        if (thumbElem.isEqualNode(this.thumbOne.getElement())) {
          this.thumbTwo.setZIndex('2');
        } else {
          this.thumbOne.setZIndex('2');
        }
      }
    });
  }

  /**
   * Добавляет событие на изменение размера окна
   */
  private addWindowResizeEventListener(): void {
    window.addEventListener('resize', this.windowResize.bind(this));
  }

  /**
   * Обработка изменения размера окна
   */
  private windowResize(): void {
    this.observer.notify('sliderResized', null);
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса Slider
   * 2. Создаёт div контейнер с классами styleClasses для компоновки элементов слайдера
   * и размещает его в DOM
   * 3. Уведомляет своих слушателей о том, что создан контейнер слайдера
   * и передаёт в сообщении его размеры
   * @param {string} styleClasses - классы для контейнера элементов слайдера
   */
  createSlider(styleClasses: string): void {
    this.slider = ElementFactory.createSlider(this.sliderWrapper, styleClasses);
    this.observer.notify('sliderElementIsCreated', this.slider.getSize());
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса Track
   * 2. Создаёт дорожку слайдера в виде div контейнера с классами styleClasses
   * @param {string} styleClasses - классы для контейнера элементов слайдера
   */
  createTrack(styleClasses: string): void {
    if (this.slider != null) {
      this.track = ElementFactory.createTrack(this.slider.getElement(),
        styleClasses, this.observer);
    }
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса Thumb
   * 2. Создаёт бегунок в виде div контейнера с классами styleClasses
   * 3. Уведомляет своих слушателей о том, что создан бегунок и передаёт в сообщении его размеры
   * @param {string} styleClasses - классы для бегунка
   */
  createThumbOne(styleClasses: string): void {
    if (this.slider != null) {
      this.thumbOne = ElementFactory.createThumb(this.slider.getElement(),
        styleClasses, this.observer);
      this.observer.notify('thumbOneIsCreated', this.thumbOne.getSize());
    }
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса Thumb
   * 2. Создаёт бегунок в виде div контейнера с классами styleClasses
   * @param {string} styleClasses - классы для бегунка
   */
  createThumbTwo(styleClasses: string): void {
    if (this.slider != null) {
      this.thumbTwo = ElementFactory.createThumb(this.slider.getElement(),
        styleClasses, this.observer);
    }
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса Tooltip
   * 2. Создаёт div контейнер с классами styleClasses для оображения значений над бегунками
   * @param {string} styleClasses - классы для создаваемого элемента
   */
  createTooltipOne(styleClasses: string): void {
    if (this.slider != null && this.thumbOne != null) {
      this.tooltipOne = ElementFactory.createTooltip(this.slider.getElement(), styleClasses);
    }
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса Tooltip
   * 2. Создаёт div контейнер с классами styleClasses для оображения значений над бегунками
   * @param {string} styleClasses - классы для создаваемого элемента
   */
  createTooltipTwo(styleClasses: string): void {
    if (this.slider != null && this.thumbTwo != null) {
      this.tooltipTwo = ElementFactory.createTooltip(this.slider.getElement(), styleClasses);
    }
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса ProgressBar
   * 2. Создаёт прогресс бар в виде div контейнера с классами styleClasses
   * @param {string} styleClasses - классы для создаваемого элемента
   */
  createProgressBar(styleClasses: string): void {
    if (this.slider != null) {
      this.progressBar = ElementFactory.createProgressBar(this.slider.getElement(), styleClasses);
    }
  }

  /**
   * Метод выполняет следующие действия:
   * 1. Создаёт объект класса Scale
   * 2. Создаёт шкалу в виде div контейнера с классами styleClasses
   * @param {string} styleClasses - классы для создаваемого элемента
   */
  createScale(styleClasses: string): void {
    if (this.slider != null) {
      this.scale = ElementFactory.createScale(this.slider.getElement(),
        styleClasses, this.observer);
      this.observer.notify('scaleIsCreated', null);
    }
  }

  /**
   * Изменяет позицию первого бегунка
   * @param {IThumbPosition} position - позиция на которую необходимо передвинуть бегунок
   */
  moveThumbOne(position: IThumbPosition): void {
    if (this.thumbOne !== null) {
      this.thumbOne.moveTo(position);
    }
  }

  /**
   * Изменяет позицию значения над первым бегунком
   * @param {ITooltipPosition} position - позиция значения над бегунком
   */
  moveTooltipOne(position: IThumbPosition): void {
    if (this.tooltipOne !== null) {
      this.tooltipOne.moveTo(position);
    }
  }

  /**
   * Возвращает объект с координатами границ слайдера, шкалы и элемента со значением позиции бегунка
   * @returns {ICoordsForMargins} - объект с координатами границ слайдера,
   * шкалы и элемента со значением позиции бегунка
   */
  getCoordsForMargins(): ICoordsForMargins {
    let newSliderCoords: IBorderCoords | null = null;
    let newTtooltipOneCoords: IBorderCoords | null = null;
    let newScaleCoords: IBorderCoords | null = null;

    if (this.slider !== null) {
      newSliderCoords = this.slider.getCoords();
    }
    if (this.tooltipOne !== null) {
      newTtooltipOneCoords = this.tooltipOne.getCoords();
    }
    if (this.scale !== null) {
      newScaleCoords = this.scale.getCoords();
    }

    return {
      sliderCoords: newSliderCoords,
      tooltipCoords: newTtooltipOneCoords,
      scaleCoords: newScaleCoords,
    };
  }

  setSliderMargins(margins: ISliderMargins): void {
    if (this.slider !== null) {
      this.slider.setMargins(margins);
    }
  }

  /**
   * Изменяет всплывающее значение над первым бегунком
   * @param {number} newValue - значение над первым бегунком
   */
  tooltipOneSetValue(newValue: number): void {
    if (this.tooltipOne !== null) {
      this.tooltipOne.setValue(newValue);
    }
  }

  /**
   * Изменяет позицию второго бегунка
   * @param {IThumbPosition} position - позиция на которую необходимо передвинуть бегунок
   */
  moveThumbTwo(position: IThumbPosition): void {
    if (this.thumbTwo != null) {
      this.thumbTwo.moveTo(position);
    }
  }

  /**
   * Изменяет позицию значения над вторым бегунком
   * @param {ITooltipPosition} position - позиция значения над бегунком
   */
  moveTooltipTwo(position: ITooltipPosition): void {
    if (this.tooltipTwo !== null) {
      this.tooltipTwo.moveTo(position);
    }
  }

  /**
   * Изменяет всплывающее значение над вторым бегунком
   * @param {number} newValue - значение над первым бегунком
   */
  tooltipTwoSetValue(newValue: number): void {
    if (this.tooltipTwo !== null) {
      this.tooltipTwo.setValue(newValue);
    }
  }

  /**
   * Изменяет позицию прогрессбара
   * @param {IProgressBarPosition} progressPosition - объект с позицией прогресс бара.
   * Содержит сведения об ориентации,
   * точке начала и ширине (или высоте, в зависимости от ориентации слайдера) прогресс бара
   */
  setProgressBarPosition(progressPosition: IProgressBarPosition): void {
    if (this.progressBar !== null) {
      this.progressBar.setPosition(progressPosition);
    }
  }

  /**
   * Возвращает размер последней точки шкалы, который является максимальным
   * @param {number} value - максимальное значение шкалы
   * @returns {IScalePointSize} - объект с шириной и высотой последней точки шкалы
   */
  getScalePointMaxSize(value: number): IScalePointSize {
    if (this.scale !== null) {
      return this.scale.getScalePointMaxSize(value);
    }

    return { width: 0, height: 0 };
  }

  /**
   * Добавляет новую точку со значением на шкалу
   * @param {IScalePointSettings} pointSettings - объект с позицией,
   * размером и значением новой точки шкалы
   */
  addScalePoint(pointSettings: IScalePointSettings): void {
    if (this.scale !== null) {
      this.scale.addScalePoint(pointSettings.position,
        pointSettings.scalePointSize, pointSettings.scalePointValue);
    }
  }

  /**
   * Удаляет слайдер из DOM
   */
  removeSlider(): void {
    if (this.slider !== null) {
      this.slider.remove();
      this.slider = null;
    }
  }

  /**
   * Удаляет первый бегунок из DOM
   */
  removeThumbOne(): void {
    if (this.thumbOne !== null) {
      this.thumbOne.remove();
      if (this.tooltipOne != null) {
        this.tooltipOne.remove();
        this.tooltipOne = null;
      }
    }
  }

  /**
   * Удаляет второй бегунок из DOM
   */
  removeThumbTwo(): void {
    if (this.thumbTwo !== null) {
      this.thumbTwo.remove();
      if (this.tooltipTwo != null) {
        this.tooltipTwo.remove();
        this.tooltipTwo = null;
      }
    }
  }

  /**
   * Удаляет шкалу из DOM
   */
  removeScale(): void {
    if (this.scale !== null) {
      this.scale.remove();
      this.scale = null;
    }
  }

  /**
   * Удаляет значение над первым бегунком из DOM
   */
  removeTooltipOne(): void {
    if (this.tooltipOne !== null) {
      this.tooltipOne.remove();
      this.tooltipOne = null;
    }
  }

  /**
   * Удаляет значение над вторым бегунком из DOM
   */
  removeTooltipTwo(): void {
    if (this.tooltipTwo !== null) {
      this.tooltipTwo.remove();
      this.tooltipTwo = null;
    }
  }

  /**
   * Устанавливает размер шкалы
   * @param {IScaleSize} scaleSize - объект с шириной и высотой шкалы
   */
  setScaleSize(scaleSize: IScaleSize): void {
    if (this.scale !== null) {
      this.scale.setScaleSize(scaleSize.width, scaleSize.height);
    }
  }
}

export default View;
