/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */

import {
  IObserver,
  IPopUps,
  IPosition,
  IProgressBarParams,
  IScalePointParams,
  ISimpleSliderView,
  ISize,
  ISubject,
  IThumbsPositions,
} from '../interfaces';

import Container from './container/container';
import Track from './track/track';
import Thumb from './thumb/thumb';
import PopUp from './pop-up/pop-up';
import ProgressBar from './progress-bar/progress-bar';
import Scale from './scale/scale';
import Subject from '../subject/subject';

export default class SimpleSliderView implements ISimpleSliderView, IObserver {
  subject: ISubject;
  private container: Container;
  private sliderWrapper: HTMLDivElement;
  private track: Track;
  private thumbOne: Thumb;
  private thumbTwo: Thumb | null;
  private popUpOne: PopUp | null;
  private popUpTwo: PopUp | null;
  private progressBar: ProgressBar;
  private scale: Scale | null;

  constructor(wrapper: HTMLDivElement) {
    this.subject = new Subject();
    this.sliderWrapper = wrapper;

    this.container = new Container();
    this.track = new Track();
    this.thumbOne = new Thumb();
    this.thumbTwo = new Thumb();
    this.popUpOne = new PopUp();
    this.popUpTwo = new PopUp();
    this.progressBar = new ProgressBar();
    this.scale = new Scale();

    this.thumbOne.subject.register('thumbIsDragged', this);
    this.thumbTwo.subject.register('thumbIsDragged', this);
    this.thumbOne.subject.register('thumbIsCatched', this);
    this.thumbTwo.subject.register('thumbIsCatched', this);
    this.track.subject.register('clickToTrack', this);
    this.scale?.subject.register('clickToScale', this);

    this.assembleSlider();
  }

  /**
   * Сборка слайдера из отдельных контролов
   */
  private assembleSlider(): void {
    this.container.append(this.track.getElement());
    this.container.append(this.thumbOne.getElement());
    if (this.thumbTwo !== null) {
      this.container.append(this.thumbTwo.getElement());
    }
    if (this.popUpOne !== null) {
      this.container.append(this.popUpOne.getElement());
    }
    if (this.popUpTwo !== null) {
      this.container.append(this.popUpTwo.getElement());
    }
    this.container.append(this.progressBar.getElement());
    if (this.scale !== null) {
      this.container.append(this.scale.getElement());
    }

    this.sliderWrapper.append(this.container.getElement());
  }

  /**
   * Перехватывание и реагирование на уведомления от субъектов, на которые подписано View
   * @param {string} eventType - тип уведомления
   */
  update(eventType: string): void {
    switch (eventType) {
      case 'thumbIsDragged':
        this.subject.notify('thumbIsDragged');
        break;
      case 'thumbIsCatched':
        this.thumbOne.resetZIndex();
        this.thumbTwo?.resetZIndex();
        break;
      case 'clickToTrack':
        this.subject.notify('clickToTrack');
        break;
      case 'clickToScale':
        this.subject.notify('clickToScale');
        break;
      default:
        break;
    }
  }

  /**
   * Меняет ориентацию слайдера на горизонтальную
   */
  switchToHorizontal(): void {
    this.container.switchToHorizontal();
    this.track.switchToHorizontal();
    this.thumbOne.switchToHorizontal();
    this.thumbTwo?.switchToHorizontal();
    this.popUpOne?.switchToHorizontal();
    this.popUpTwo?.switchToHorizontal();
    this.progressBar.switchToHorizontal();
    this.scale?.switchToHorizontal();
  }

  /**
   * Меняет ориентацию слайдера на вертикальную
   */
  switchToVertical(): void {
    this.container.switchToVertical();
    this.track.switchToVertical();
    this.thumbOne.switchToVertical();
    this.thumbTwo?.switchToVertical();
    this.popUpOne?.switchToVertical();
    this.popUpTwo?.switchToVertical();
    this.progressBar.switchToVertical();
    this.scale?.switchToVertical();
  }

  /**
   * Меняет тип слайдера на одиночный, удаляя второй бегунок
   */
  switchToSingle(): void {
    this.thumbTwo?.subject.unsubscribe('thumbIsCatched', this);
    this.thumbTwo?.subject.unsubscribe('thumbIsCatched', this);

    this.thumbTwo?.remove();
    this.thumbTwo = null;
    this.popUpTwo?.remove();
    this.popUpTwo = null;
  }

  /**
   * Меняет тип слайдера на диапазон, добавляя второй бегунок, если он отсутствует
   */
  switchToRange(): void {
    if (this.thumbTwo === null) {
      this.thumbTwo = new Thumb(this.container.getOrientation());
      this.container.append(this.thumbTwo.getElement());

      if (this.popUpOne !== null) {
        this.popUpTwo = new PopUp(this.container.getOrientation());
        this.container.append(this.popUpTwo.getElement());
      }

      this.thumbTwo.subject.register('thumbIsDragged', this);
      this.thumbTwo.subject.register('thumbIsCatched', this);
    }
  }

  /**
   * Отключает всплывающие подсказки над бегунками
   */
  disablePopUps(): void {
    this.popUpOne?.remove();
    this.popUpOne = null;
    this.popUpTwo?.remove();
    this.popUpTwo = null;
  }

  /**
   * Включает всплывающие подсказки над бегунками
   */
  enablePopUps(): void {
    if (this.popUpOne === null) {
      this.popUpOne = new PopUp(this.container.getOrientation());
      this.container.append(this.popUpOne.getElement());
    }

    if (this.popUpTwo === null && this.thumbTwo !== null) {
      this.popUpTwo = new PopUp(this.container.getOrientation());
      this.container.append(this.popUpTwo.getElement());
    }
  }

  /**
   * Отключает шкалу
   */
  disableScale(): void {
    this.scale?.subject.unsubscribe('clickToScale', this);
    this.scale?.remove();
    this.scale = null;
  }

  /**
   * Включает шкалу
   */
  enableScale(): void {
    if (this.scale !== null) {
      this.scale?.remove();
    }
    this.scale = new Scale(this.container.getOrientation());
    this.container.append(this.scale.getElement());
    this.scale.subject.register('clickToScale', this);
  }

  /**
   * Возвращение размера бегунка
   * @returns {ISize} - объкт с шириной и высотой бегунка
   */
  getThumbSize(): ISize {
    return this.thumbOne.getSize();
  }

  /**
   * Возвращение размера слайдера
   * @returns {IPosition} - объект с отступами от левого и верхнего края родительского
   * контейнера
   */
  getSliderSize(): ISize {
    return this.container.getSize();
  }

  /**
   * Взвращение позиций бегунков
   * @returns {IThumbsPositions} - объект с позициями бегунков
   */
  getThumbsPos(): IThumbsPositions {
    const thumbOne = this.thumbOne.getPosition();
    let thumbTwo: IPosition | null = null;
    if (this.thumbTwo !== null) {
      thumbTwo = this.thumbTwo.getPosition();
    }
    return { thumbOne, thumbTwo };
  }

  /**
   * Обновляет позиции бегунков
   * @param {IThumbsPositions} thumbsPositions - объект с позициями бегунков
   */
  updateThumbs(thumbsPositions: IThumbsPositions): void {
    this.thumbOne.moveTo(thumbsPositions.thumbOne);
    if (thumbsPositions.thumbTwo !== null) {
      this.thumbTwo?.moveTo(thumbsPositions.thumbTwo);
    }
  }

  /**
   * Обновляет позицию и размер прогрессбара
   * @param {IProgressBarParams} thumbsPositions - объект с позицей и размером прогрессбара
   */
  updateProgressBar(params: IProgressBarParams): void {
    this.progressBar.update(params);
  }

  /**
   * Обновляет значения попапов
   * @param {IProgressBarParams} thumbsPositions - объект со значениями попапов
   */
  updatePopUps(params: IPopUps): void {
    if (this.popUpOne !== null) {
      this.popUpOne.update(params.popUpOne);
    }
    if (this.popUpTwo !== null) {
      this.popUpTwo.update(params.popUpTwo);
    }
  }

  /**
   * Возвращает объект с шириной и высотой одного деления шкалы (включая маркер деления и значение)
   * @param {number} value - максимальное значение слайдера
   * @returns {ISize} - объект с шириной и высотой одного деления шкалы
   */
  getScalePointSize(value: number): ISize {
    if (this.scale !== null) {
      return this.scale.getPointSize(value);
    }
    return { width: 0, height: 0 };
  }

  /**
   * Добавляет деления к шкале
   * @param {IScalePointParams[]} points - массив объектов с параметрами делений шкалы
   */
  addScalePoints(points: IScalePointParams[]): void {
    this.scale?.addPoints(points);
  }

  /**
   * Возвращает позицию последнего клика по треку
   * @returns {IPosition} - объект с позицией последнего клика по треку
   */
  getTrackClickPosition(): IPosition {
    return this.track.getPosition();
  }

  /**
   * Возвращает позицию последнего клика по шкале
   * @returns {IPosition} - объект с позицией последнего клика по шкале
   */
  getScaleClickPosition(): IPosition {
    const position =
      this.scale === null ? { left: 0, top: 0 } : this.scale.getPosition();
    return position;
  }
}
