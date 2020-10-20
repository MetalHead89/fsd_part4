import {Slider} from '../slider/slider';
import {Track} from '../slider/track';
import {Thumb} from '../slider/thumb';

export interface IPluginSettings {
    'orienation': string,
    'type': string,
    'minValue': number,
    'maxValue': number,
    'step': number
}

export interface IGroupedSettings {
    'sliderSettings': ISliderSettings
    'thumbSettings': IThumbSettings
}

export interface INewSliderOptions {
    'sliderPosition': HTMLElement,
    'settings': IGroupedSettings
}

export interface ISliderComponents {
    'sliderElem': HTMLElement,
    'trackElem': HTMLElement,
    'thumbElem': HTMLElement
}

// export interface ISliderArgs {
//     'sliderElem': HTMLElement,
//     'orientation': String,
//     'type': String
// }

export interface IThumbSettings {
    'minValue': number,
    'maxValue': number,
    'step': number
}

export interface ISliderSettings {
    'orientation': string,
    'type': string
}

// export interface IThumbArgs {
//     'thumbElem': HTMLElement,
//     'minValue': number,
//     'maxValue': number,
//     'step': number
// }

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