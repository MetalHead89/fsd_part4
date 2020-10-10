import {Track} from '../slider/track';
import {Thumb} from '../slider/thumb';

export class Slider {
    element: HTMLElement;
    track: Track;
    thumb: Thumb;

    constructor(sliderComponents: {[index: string]: HTMLElement}) {
        this.element = sliderComponents.slider;
        this.track = new Track(sliderComponents.track);
        this.thumb = new Thumb(sliderComponents.thumb);
    }
}