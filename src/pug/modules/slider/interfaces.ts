import {Slider} from '../slider/slider';
import {Track} from '../slider/track';
import {Thumb} from '../slider/thumb';

export interface IPluginSettings {
    'orienation': String,
    'type': String,
    'minValue': Number,
    'maxValue': Number,
    'step': Number
}

export interface INewSliderOptions {
    'sliderPosition': HTMLElement,
    'settings': IPluginSettings
}

export interface ISliderComponents {
    'sliderElem': HTMLElement,
    'trackElem': HTMLElement,
    'thumbElem': HTMLElement
}

export interface ISliderArgs {
    'sliderElem': HTMLElement,
    'orientation': String,
    'type': String
}

export interface IThumbArgs {
    'thumbElem': HTMLElement,
    'minValue': Number,
    'maxValue': Number,
    'step': Number
}

// // Интерфейс компонентов слайдера
// export interface ISliderComponents {
//     'slider': HTMLElement,
//     'track': HTMLElement,
//     'thumb': HTMLElement
// }

// // Интерфейс опций бегунка
// export interface IThumbOptions {
//     'element': HTMLElement,
//     'minValue': Number,
//     'maxValue': Number,
//     'step': Number
// }



// export interface IMoveToArgs {
//     thumbElem: HTMLElement;
//     newLeft: number;
// }