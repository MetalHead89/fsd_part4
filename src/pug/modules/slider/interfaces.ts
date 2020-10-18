// Интерфейс настроек плагина
export interface iPluginSettings {
    'orienation': String,
    'type': String,
    'minValue': Number,
    'maxValue': Number,
    'step': Number
}

export interface IMoveToArgs {
    thumbElem: HTMLElement;
    newLeft: number;
}