import { IObservable } from '../interfaces';
import { IObserverFunc } from '../interfaces';


/**
 * Создаёт механизм подписки, позволяющий одним объектам следить и реагировать на события, происходящие в других объектах
 */
class Observable {

    // объект хранящий уведомления в виде ключей и связанные с ними функции в виде значений
    private observables: IObservable;

    constructor() {
        this.observables = {};
    }


    /**
     * Подписывет наблюдателя на выполнение функции func при получении уведомления notification
     * 
     * @param {string} notification - уведомление при получении которого вызывается функция func
     * @param {Function} func - функция, которая вызывается после получения наблюдателем уведомления notification
     */
    subscribe<T>(notification: string, func: IObserverFunc<T>): void {
        this.observables[notification] = this.observables[notification] || [];
        this.observables[notification].push(func);
    }


    /**
     * Отписывает наблюдателя от выполнения функции func при получении уведомления notification
     * 
     * @param {string} notification - уведомление из которого нужно удалить обработчик func
     * @param {Function} func - функция, которую необходимо удалить из уведомления notification
     */
    unsubscribe<T>(notification: string, func: IObserverFunc<T>): void {
        this.observables[notification] = this.observables[notification].filter(subscriberfunc => subscriberfunc !== func);
    }


    /**
     * Отправляет наблюдателю уведомление notification, при получении которого будет запущена привязанная к нему
     * функция с аргументом data
     * 
     * @param {string} notification - уведомление на которое должен среагировать наблюдатель
     * @param {any} data - аргумент, который будет передан в функцию, вызываемую после получения
     * наблюдателем уведомления notification
     */
    notify<T>(notification: string, data: T): void {
        if (this.observables[notification]) {
            this.observables[notification].forEach(function (listener: IObserverFunc<T>) {
                listener(data);
            });
        }
    }

}

export default Observable;