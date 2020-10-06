class Slider {
    element: HTMLElement;
    track: Track;
    thumb: Thumb;

    constructor(slider: HTMLElement) {
        this.element = slider;
        this.track = new Track(slider.querySelector('.slider__track'));
        this.thumb = new Thumb(slider.querySelector('.slider__thumb'));
    }
}

class Thumb {
    color: string = '';
    element: HTMLElement | null;

    constructor(thumb: HTMLElement | null) {
        this.element = thumb;

        // if (this.element) {
        //     this.element.addEventListener('mousedown', presenter.onMouseDownThumb);
        //     // this.thumb.onmousedown = function(event) {
        //     //     moveAt(this.thumb, event.pageX, event.pageY);

        //     //     function moveAt(thumb:HTMLElement, pageX: number, pageY:number) {
        //     //         this.style.left = pageX - this.offsetWidth / 2 + 'px';
        //     //         ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
        //     //     }
        //     // }
        // }            
    }
}

class Track {
    color: string = '';
    element: HTMLElement | null;

    constructor(track: HTMLElement | null) {
        this.element = track;
    }
}

class Observable {
    observers: { [index:string] : Function[] };

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

    notify(type: string, data: HTMLElement | null) {
        if (this.observers[type]) {
            this.observers[type].forEach(function(listener: Function) {
                listener(data);
            });
        }
    }
}

class View {

    observer: Observable;
    // slidersElements: NodeListOf<HTMLElement>;

    constructor(observer: Observable) {
        this.observer = observer;
        // this.slidersElements = document.querySelectorAll('.slider');
        // const sliders: NodeListOf<HTMLElement> = document.querySelectorAll('.slider');

        // for (let sliderElement of sliders) {
        //     // const slider: Slider = new Slider(sliderElement);
        //     // if (slider.thumb.element) {
        //     //     slider.thumb.element.addEventListener('mousedown', () => {
        //     //         observer.notify('type');
        //     //     })
        //     // }
        // }
    }

    searchSliders(): void {
        let slidersElements: NodeListOf<HTMLElement> = document.querySelectorAll('.slider');

        for (let slider of slidersElements) {
            this.observer.notify('newSliderFound', slider);
        }
    }

    moveThumb(thumb: HTMLElement): void {

    }
    // getSliders() {
    //     return document.querySelectorAll('.slider')
    // },
    // moveThumb(thumb) {
    //     console.log(thumb)
    // }
}

class Model {
    observer: Observable;

    constructor(observer: Observable) {
        this.observer = observer;
    }

    createSlider(sliderHTMLElement: HTMLElement) {
        const slider: Slider = new Slider(sliderHTMLElement);
        this.observer.notify('sliderCreated', null)
    }
}

class Presenter {
    view: View;
    model: Model;
    observer: Observable;

    constructor(view: View, model: Model, observer: Observable) {
        this.view = view;
        this.model = model;
        this.observer = observer;

        // this.observer.subscribe('newSliderFound', (data:HTMLElement) => {console.log(data)});
    }

    initialize(): void {
        this.observer.subscribe('newSliderFound', 
            (sliderHTMLElement:HTMLElement) => {this.model.createSlider(sliderHTMLElement)});
        this.observer.subscribe('sliderCreated', () => {});

        this.view.searchSliders();
    }



    // initialize() {
    //     const sliders: NodeListOf<HTMLElement> = view.getSliders();

    //     for (let slider of sliders) {
    //         model.createSlider(slider)
    //     }
    // }

    // onMouseDownThumb() {
    //     console.log(this);
    // }

}

window.onload = () => {
    const observer = new Observable();
    const model: Model = new Model(observer);
    const view: View = new View(observer);
    const presenter: Presenter = new Presenter(view, model, observer);
    presenter.initialize();
}









// ////          Classes          ////

// class Slider {
//     slider: HTMLElement;
//     track: Track;
//     thumb: Thumb;

//     constructor(slider: HTMLElement) {
//         this.slider = slider;
//         this.track = new Track(slider.querySelector('.slider__track'));
//         this.thumb = new Thumb(slider.querySelector('.slider__thumb'));
//     }
// }

// class Thumb {
//     color: string = '';
//     thumb: HTMLElement | null;

//     constructor(thumb: HTMLElement | null) {
//         this.thumb = thumb;

//         if (this.thumb) {
//             this.thumb.addEventListener('mousedown', presenter.onMouseDownThumb);
//             // this.thumb.onmousedown = function(event) {
//             //     moveAt(this.thumb, event.pageX, event.pageY);

//             //     function moveAt(thumb:HTMLElement, pageX: number, pageY:number) {
//             //         this.style.left = pageX - this.offsetWidth / 2 + 'px';
//             //         ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
//             //     }
//             // }
//         }            
//     }
// }

// class Track {
//     color: string = '';
//     track: HTMLElement | null;

//     constructor(track: HTMLElement | null) {
//         this.track = track;
//     }
// }

// class Scale {

// }




// ////          Interfaces          ////

// interface Presenter {
//     initialize(): void;
//     onMouseDownThumb(): void;
// }

// interface View {
//     getSliders(): NodeListOf<HTMLElement>;
//     moveThumb(thumb: Thumb): void;
// };

// interface Model {
//     createSlider(slider: HTMLElement) :void;
// }




// ////          Presenter          ////

// const presenter: Presenter = {
//     initialize() {
//         const sliders: NodeListOf<HTMLElement> = view.getSliders();

//         for (let slider of sliders) {
//             model.createSlider(slider)
//         }
//     },
//     onMouseDownThumb() {
//         console.log(this);
//     }

// };




// ////          View          ////

// const view: View = {
//     getSliders() {
//         return document.querySelectorAll('.slider')
//     },
//     moveThumb(thumb) {
//         console.log(thumb)
//     }
// };




// ////          Model          ////

// const model: Model = {
//     createSlider(sliderHTMLElement) {
//         const slider: Slider = new Slider(sliderHTMLElement);
//     }
// }




// ////          Start application          ////

// presenter.initialize();