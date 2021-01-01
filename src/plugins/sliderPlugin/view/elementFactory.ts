import { ICreateObject } from '../interfaces';

import Observer from '../observer/observer';
import Slider from './slider';
import Track from './track';
import Thumb from './thumb';
import Tooltip from './tooltip';
import ProgressBar from './progressBar';
import Scale from './scale';

/**
 * Класс-фабрика для создания элементов слайдера
 */
class ElementFactory {
  private static createElement<T>(parrent: HTMLDivElement,
    styleClasses: string, createObj: ICreateObject<T>): T {
    /**
     * Метод для создания объектов различных классов.
     * Объект конкретного класса создаётся путём вызова функции из параметра createObj
     * с аргументом, который служит параметром для конструктора создаваемого объекта.
     * Метод выполняет следующие действия:
     * 1. Создаёт элемент div с классами из параметра styles
     * 2. Создаёт объект класса возвращаемого функцией creteObj
     * 3. Добавляет созданный div элемент в контейнер из параметра parrent
     * 4. Возвращает в вызывающий код объект класса созданного функцией creteObj
     * @param {HTMLDivElement} parrent - родительский контейнер, в который будет добавлен
     * созданный HTML элемент
     * @param {string} styleClasses - строка с классами для создаваемого элемента
     * @param {Function} createObj - функция создающая и возвращающая новый объект
     * с заданным классом
     * @returns {any} - объект класса созданного функцией creteObj
     */

    const element: HTMLDivElement = document.createElement('div');
    element.className = styleClasses;
    const obj = createObj(element);
    parrent.prepend(element);

    return obj;
  }

  /**
   * Возвращает объект класса Slider. Метод выполняет следующие действия:
   * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса Slider
   * 2. Вызывает метод createElement в котором создаётся объект класса Slider и div элемент slider,
   * с классами из параметра styles, помещённый в контейнер из параметра parrent
   * 3. Возвращает в вызывающий код объект класса Slider
   * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
   * @param {string} styleClasses - классы для создаваемого элемента
   * @returns {Slider} - объект класса Slider
   */
  static createSlider(parrent: HTMLDivElement, styleClasses: string): Slider {
    const createSliderObj = (obj: HTMLDivElement) => {
      const slider = new Slider(obj);
      return slider;
    };
    const slider = ElementFactory.createElement<Slider>(parrent, styleClasses, createSliderObj);

    return slider;
  }

  /**
   * Возвращает объект класса Track
   * Метод выполняет следующие действия:
   * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса Track
   * 2. Вызывает метод createElement в котором создаётся объект класса Track и div элемент track,
   * с классами из параметра styles, помещённый в контейнер из параметра parrent
   * 3. Возвращает в вызывающий код объект класса Track
   * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
   * @param {string} styleClasses - классы для создаваемого элемента
   * @param {Observer} observer - обсервер для отправки уведомлений подписчикам
   * @returns {Track} - объект класса Track
   */
  static createTrack(parrent: HTMLDivElement, styleClasses: string, observer: Observer): Track {
    const createTrackrObj = (obj: HTMLDivElement) => {
      const track = new Track(obj, observer);
      return track;
    };
    const track = ElementFactory.createElement<Track>(parrent, styleClasses, createTrackrObj);

    return track;
  }

  /**
   * Возвращает объект класса Thumb
   * Метод выполняет следующие действия:
   * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса Thumb
   * 2. Вызывает метод createElement в котором создаётся объект класса Thumb и div элемент thumb,
   * с классами из параметра styles, помещённый в контейнер из параметра parrent
   * 3. Возвращает в вызывающий код объект класса Thumb
   * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
   * @param {string} styleClasses - классы для создаваемого элемента
   * @param {Observer} observer - обсервер для отправки уведомлений подписчикам
   * @returns {Thumb} - объект класса Thumb
   */
  static createThumb(parrent: HTMLDivElement, styleClasses: string, observer: Observer): Thumb {
    const createThumbObj = (obj: HTMLDivElement) => {
      const thumb = new Thumb(obj, observer);
      return thumb;
    };
    const thumb = ElementFactory.createElement<Thumb>(parrent, styleClasses, createThumbObj);

    return thumb;
  }

  /**
   * Возвращает объект класса Tooltip
   * Метод выполняет следующие действия:
   * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса Tooltip
   * 2. Вызывает метод createElement в котором создаётся объект класса Tooltip и div элемент
   * tooltip, с классами из параметра styles, помещённый в контейнер из параметра parrent
   * 3. Возвращает в вызывающий код объект класса Tooltip
   * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
   * @param {string} styleClasses - классы для создаваемого элемента
   * @returns {Thumb} - объект класса Tooltip
   */
  static createTooltip(parrent: HTMLDivElement, styleClasses: string): Tooltip {
    const createTooltipObj = (obj: HTMLDivElement) => {
      const tooltip = new Tooltip(obj);
      return tooltip;
    };
    const tooltip = ElementFactory.createElement<Tooltip>(parrent, styleClasses, createTooltipObj);

    return tooltip;
  }

  /**
   * Возвращает объект класса ProgressBar
   * Метод выполняет следующие действия:
   * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса ProgressBar
   * 2. Вызывает метод createElement в котором создаётся объект класса ProgressBar и div элемент
   * progressBar, с классами из параметра styles, помещённый в контейнер из параметра parrent
   * 3. Возвращает в вызывающий код объект класса ProgressBar
   * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
   * @param {string} styleClasses - классы для создаваемого элемента
   * @returns {ProgressBar} - объект класса ProgressBar
   */
  static createProgressBar(parrent: HTMLDivElement, styleClasses: string): ProgressBar {
    const createProgressBarObj = (obj: HTMLDivElement) => {
      const progressBar = new ProgressBar(obj);
      return progressBar;
    };
    const progressBar = ElementFactory.createElement<ProgressBar>(parrent,
      styleClasses, createProgressBarObj);

    return progressBar;
  }

  /**
   * Возвращает объект класса Scale
   * Метод выполняет следующие действия:
   * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса Scale
   * 2. Вызывает метод createElement в котором создаётся объект класса Scale и div элемент scale,
   * с классами из параметра styles, помещённый в контейнер из параметра parrent
   * 3. Возвращает в вызывающий код объект класса Scale
   * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
   * @param {string} styleClasses - классы для создаваемого элемента
   * @param {Observer} observer - обсервер для отправки уведомлений подписчикам
   * @returns {ProgressBar} - объект класса Scale
   */
  static createScale(parrent: HTMLDivElement, styleClasses: string, observer: Observer): Scale {
    const createScaleObj = (obj: HTMLDivElement) => {
      const scale = new Scale(obj, observer);
      return scale;
    };
    const scale = ElementFactory.createElement<Scale>(parrent, styleClasses, createScaleObj);

    return scale;
  }
}

export default ElementFactory;
