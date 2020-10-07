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

    notify(type: string, data: HTMLElement | null) {
        if (this.observers[type]) {
            this.observers[type].forEach(function (listener: Function) {
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
    }

    searchSliders(): void {
        let slidersElements: NodeListOf<HTMLElement> = document.querySelectorAll('.slider');

        for (let slider of slidersElements) {
            slider.addEventListener('mousedown', event => { this.sliderOnMouseDown(slider, event) });

            this.observer.notify('newSliderFound', slider);
        }
    }

    sliderOnMouseDown(slider: HTMLElement, event: MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;

        if (target.classList.contains('slider__thumb')) {
            this.moveThumb(slider, target, event);
        }
    }

    moveThumb(slider: HTMLElement, thumb: HTMLElement, event: MouseEvent): void {

        let coords: { [index: string]: number } = this.getCoords(thumb);
        let shiftX: number = event.pageX - coords.left;

        moveAt(event);
        
        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', documentOnMouseUp);
        thumb.ondragstart = function () { return false; };

        function moveAt(event: MouseEvent) {
            thumb.style.left = event.pageX - slider.offsetLeft - shiftX + 'px';

            if (parseInt(thumb.style.left) < 0) {
                thumb.style.left = '0px';
            } else if (parseInt(thumb.style.left) > slider.offsetWidth - thumb.offsetWidth) {
                thumb.style.left = slider.offsetWidth - thumb.offsetWidth + 'px';
            }
        }

        function documentOnMouseUp() {
            document.removeEventListener('mousemove', moveAt)
            document.removeEventListener('mouseup', documentOnMouseUp)
        }
    }

    getCoords(elem: HTMLElement): { [index: string]: number } {
        let box: DOMRect = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
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
            (sliderHTMLElement: HTMLElement) => { this.model.createSlider(sliderHTMLElement) });
        this.observer.subscribe('sliderCreated', () => { });

        this.view.searchSliders();
    }
}

window.onload = () => {
    const observer = new Observable();
    const model: Model = new Model(observer);
    const view: View = new View(observer);
    const presenter: Presenter = new Presenter(view, model, observer);
    presenter.initialize();
}