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



// export interface IMoveToArgs {
//     thumbElem: HTMLElement;
//     newLeft: number;
// }