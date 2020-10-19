import {Slider} from '../slider/slider';
import {Track} from '../slider/track';
import {Thumb} from '../slider/thumb';

// Интерфейс настроек плагина
export interface IPluginSettings {
    'orienation': String,
    'type': String,
    'minValue': Number,
    'maxValue': Number,
    'step': Number
}

// Интерфейс опций нового слайдера
export interface INewSliderOptions {
    'sliderPosition': HTMLElement,
    'settings': IPluginSettings
}

// Интерфейс компонентов слайдера
export interface ISliderComponents {
    'slider': HTMLElement,
    'track': HTMLElement,
    'thumb': HTMLElement
}

// Интерфейс опций бегунка
export interface IThumbOptions {
    'element': HTMLElement,
    'minValue': Number,
    'maxValue': Number,
    'step': Number
}



// export interface IMoveToArgs {
//     thumbElem: HTMLElement;
//     newLeft: number;
// }