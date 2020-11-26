import Slider from './slider';
import Track from './track';

class ElementFactory {

    createSlider(parrent: HTMLDivElement, styleClasses: string): Slider {

        /**
         * Возвращает объект класса Slider
         * 
         * Метод выполняет следующие действия:
         * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса Slider
         * 2. Вызывает метод createElement в котором создаётся объект класса Slider и div элемент slider, с классами из
         * параметра styles, помещённый в контейнер из параметра parrent
         * 3. Возвращает в вызывающий код объект класса Slider
         * 
         * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
         * @param {string} styleClasses - классы для создаваемого элемента
         * 
         * @returns {Slider} - объект класса Slider
         */

        const createSliderObj = (obj: HTMLDivElement) => { return new Slider(obj) }
        const slider = this.createElement(parrent, styleClasses, createSliderObj);

        return slider

    }

    createTrack(parrent: HTMLDivElement, styleClasses: string): Track {

        /**
         * Возвращает объект класса Track
         * 
         * Метод выполняет следующие действия:
         * 1. Создаёт callback функцию, которая создаёт и возвращает новый объект класса Track
         * 2. Вызывает метод createElement в котором создаётся объект класса Track и div элемент track, с классами из
         * параметра styles, помещённый в контейнер из параметра parrent
         * 3. Возвращает в вызывающий код объект класса Track
         * 
         * @param {HTMLDivElement} parrent - контейнер, в который будет добавлен создаваемый элемент
         * @param {string} styleClasses - классы для создаваемого элемента
         * 
         * @returns {Track} - объект класса Track
         */

        const createTrackrObj = (obj: HTMLDivElement) => { return new Track(obj) }
        const track = this.createElement(parrent, styleClasses, createTrackrObj);

        return track;

    }

    private createElement(parrent: HTMLDivElement, styleClasses: string, createObj: Function): any {

        /**
         * Метод для создания объектов различных классов.
         * Объект конкретного класса создаётся путём вызова функции из параметра createObj с аргументом, который служит параметром
         * для конструктора создаваемого объекта.
         * 
         * Метод выполняет следующие действия:
         * 1. Создаёт элемент div с классами из параметра styles
         * 2. Создаёт объект класса возвращаемого функцией creteObj
         * 3. Добавляет созданный div элемент в контейнер из параметра parrent
         * 4. Возвращает в вызывающий код объект класса созданного функцией creteObj
         * 
         * @param {HTMLDivElement} parrent - родительский контейнер, в который будет добавлен созданный HTML элемент
         * @param {string} styleClasses - строка с классами для создаваемого элемента
         * @param {Function} createObj - функция создающая и возвращающая новый объект с заданным классом
         * 
         * @returns {any} - объект класса созданного функцией creteObj
         */

        const element: HTMLDivElement = document.createElement('div');
        element.className = styleClasses;
        const obj = createObj(element);
        parrent.append(element);

        return obj;

    }

}

export default ElementFactory;