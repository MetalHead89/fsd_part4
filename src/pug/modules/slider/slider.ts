class Slider {
    slider: HTMLElement;
    track: HTMLElement | null;
    thumb: HTMLElement | null;

    constructor(slider: HTMLElement) {
        this.slider = slider;
        this.track = slider.querySelector('.slider__track');
        this.thumb = slider.querySelector('.slider__thumb');
    }
}