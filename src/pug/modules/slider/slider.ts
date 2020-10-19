import {Track} from '../slider/track';
import {Thumb} from '../slider/thumb';
import { ISliderComponents } from '../slider/interfaces';
import { IPluginSettings } from '../slider/interfaces';
import { IThumbOptions } from '../slider/interfaces';

export class Slider {
    private element: HTMLElement;
    private orienation: String;
    private type: String;
    private track: Track;
    private thumb: Thumb;    

    constructor(sliderComponents: ISliderComponents, settings: IPluginSettings) {
        this.element = sliderComponents.slider;
        this.orienation = settings.orienation;
        this.type = settings.type;
        this.track = new Track(sliderComponents.track);

        const thumbOptions: IThumbOptions = {
            'element': sliderComponents.thumb,
            'minValue': settings.minValue,
            'maxValue': settings.maxValue,
            'step': settings.step
        }
        this.thumb = new Thumb(thumbOptions);
    }
}





// import {Track} from '../slider/track';
// import {Thumb} from '../slider/thumb';

// export class Slider {
//     element: HTMLElement;
//     track: Track;
//     thumb: Thumb;
//     coords: DOMRect | null = null;
//     onMouseMoveHadler: Function | null = null;
//     onMouseUpHadler: Function | null = null;
    

//     constructor(sliderComponents: {[index: string]: HTMLElement}) {
//         this.element = sliderComponents.sliderElem;
//         this.track = new Track(sliderComponents.trackElem);
//         this.thumb = new Thumb(sliderComponents.thumbElem);
//     }
// }