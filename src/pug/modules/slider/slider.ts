////          Classes          ////

class Slider {
    slider: HTMLElement;
    track: HTMLElement | null;
    thumb: Thumb;

    constructor(slider: HTMLElement) {
        this.slider = slider;
        this.track = slider.querySelector('.slider__track');
        this.thumb = new Thumb(slider.querySelector('.slider__thumb'));
    }
}

class Thumb {
    color: string = '';
    thumb: HTMLElement | null;

    constructor(thumb: HTMLElement | null) {
        this.thumb = thumb;

        if (this.thumb)
            this.thumb.onclick = () => {alert('111')};
    }
}




////          Interfaces          ////

interface Presenter {
    initialize(): void;
}

interface View {
    getSliders(): NodeListOf<HTMLElement>;
};

interface Model {
    createSlider(slider: HTMLElement) :void;
}




////          Presenter          ////

const presenter: Presenter = {
    initialize() {
        const sliders: NodeListOf<HTMLElement> = view.getSliders();

        for (let slider of sliders) {
            model.createSlider(slider)
        }
    }
};




////          View          ////

const view: View = {
    getSliders() {
        return document.querySelectorAll('.slider')
    }
};




////          Model          ////

const model: Model = {
    createSlider(sliderHTMLElement) {
        const slider: Slider = new Slider(sliderHTMLElement);
    }
}




////          Start application          ////

presenter.initialize();