import { IObservable } from '../interfaces';

class Observable {

    // объект хранящий уведомления в виде ключей и связанные с ними функции в виде значений
    private observables: IObservable;

    constructor() {
        this.observables = {};
    }

    subscribe(notification: string, func: Function): void {

        /**
         * Подписывет наблюдателя на выполнение функции func при получении уведомления notification
         * 
         * @param {string} notification - уведомление при получении которого вызывается функция func
         * @param {Function} func - функция, которая вызывается после получения наблюдателем уведомления notification
         */

        this.observables[notification] = this.observables[notification] || [];
        this.observables[notification].push(func);

    }

    unsubscribe(notification: string, func: Function): void {

        /**
         * Отписывает наблюдателя от выполнения функции func при получении уведомления notification
         * 
         * @param {string} notification - уведомление из которого нужно удалить обработчик func
         * @param {Function} func - функция, которую необходимо удалить из уведомления notification
         */

        this.observables[notification] = this.observables[notification].filter(subscriberfunc => subscriberfunc !== func);

    }

    notify(notification: string, data: any): void {

        /**
         * Отправляет наблюдателю уведомление notification, при получении которого будет запущена привязанная к нему
         * функция с аргументом data
         * 
         * @param {string} notification - уведомление на которое должен среагировать наблюдатель
         * @param {any} data - аргумент, который будет передан в функцию, вызываемую после получения
         * наблюдателем уведомления notification
         */

        if (this.observables[notification]) {
            this.observables[notification].forEach(function (listener: Function) {
                listener(data);
            });
        }
    }

}

export default Observable;