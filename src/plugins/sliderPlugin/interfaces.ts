export interface IPluginSettings {
    'orienation': string,
    'type': string,
    'scale': boolean,
    'minValue': number,
    'maxValue': number,
    'step': number
}

export interface IGroupedSettings {
    'sliderSettings': ISliderSettings
    'thumbSettings': IThumbSettings,
    'scaleSettings': IScaleSettings
}

export interface INewSliderOptions {
    'sliderPosition': HTMLElement,
    'settings': IGroupedSettings
}

export interface ISliderComponents {
    'sliderElem': HTMLElement,
    'trackElem': HTMLElement,
    'progressBar': HTMLElement,
    'thumbElem': HTMLElement,
    'scaleElem': HTMLElement
}

export interface IThumbSettings {
    'minValue': number,
    'maxValue': number,
    'step': number
}

export interface ISliderSettings {
    'orientation': string,
    'type': string,
}

export interface IScaleSettings {
    'displayed': boolean,
    'minValue': number,
    'maxValue': number,
}