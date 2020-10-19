import { ISliderArgs } from '../slider/interfaces';

export class Slider {
    private element: HTMLElement;
    private orienation: String;
    private type: String; 

    constructor(sliderArgs: ISliderArgs) {
        this.element = sliderArgs.sliderElem;
        this.orienation = sliderArgs.orientation;
        this.type = sliderArgs.type;
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