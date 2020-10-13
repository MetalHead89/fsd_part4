export class Observable {
    observers: { [index: string]: Function[] };

    constructor() {
        this.observers = {};
    }

    subscribe(type: string, func: Function) {
        this.observers[type] = this.observers[type] || [];
        this.observers[type].push(func);
    }

    // unsubscribe(func: Function) {
    //     this.observers = this.observers.filter(subscriber => subscriber !== func);
    // }

    notify(type: string, data: {[index: string]: HTMLElement | number} | null) {
        if (this.observers[type]) {
            this.observers[type].forEach(function (listener: Function) {
                listener(data);
            });
        }
    }
}