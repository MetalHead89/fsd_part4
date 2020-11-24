import { IObservable } from '../interfaces';

class Observable {

    private observables: IObservable;

    constructor() {
        this.observables = {};
    }

    subscribe(type: string, func: Function) {
        this.observables[type] = this.observables[type] || [];
        this.observables[type].push(func);
    }

    // unsubscribe(func: Function) {
    //     this.observers = this.observers.filter(subscriber => subscriber !== func);
    // }

    notify(type: string, data: any) {
        if (this.observables[type]) {
            this.observables[type].forEach(function (listener: Function) {
                listener(data);
            });
        }
    }
    
}

export default Observable;