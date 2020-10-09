class Slider {
    element: HTMLElement;
    track: Track;
    thumb: Thumb;

    constructor(slider: HTMLElement, track: HTMLElement, thumb: HTMLElement) {
        this.element = slider;
        this.track = new Track(track);
        this.thumb = new Thumb(thumb);
    }
}