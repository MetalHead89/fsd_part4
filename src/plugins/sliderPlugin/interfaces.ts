export interface ISliderSettings {
    'orienation': string,
    'type': string,
    'scale': boolean,
    'tooltips': boolean,
    'min': number,
    'max': number,
    'step': number
}

export interface IObserverFunc<T> {
    (data: T): void;
}

export interface IObservable {
    [index: string]: IObserverFunc<any>[];
}

export interface ICreateObject<T> {
    (obj: HTMLDivElement): T;
}

export interface ISliderSize {
    'width': number,
    'height': number
}

export interface IThumbSize {
    'width': number,
    'height': number
}

export interface IThumbShift {
    'shiftX': number,
    'shiftY': number
}

export interface IThumbPosition {
    'left': number,
    'top': number
}

export interface ITooltipPosition {
    'left': number,
    'top': number
}

export interface ICursorPosition {
    'x': number,
    'y': number
}

export interface IScalePointSize {
    'width': number,
    'height': number
}

export interface IDragThumbArgs {
    'thumbPosition': IThumbPosition,
    'tooltipValue': number
}

export interface IProgressBarPosition {
    'orientation': string,
    'start': number,
    'end': number
}

export interface IScalePointSettings {
    'position': number,
    'scalePointSize': number,
    'scalePointValue': number
}

export interface IScaleSize {
    'width': number,
    'height': number
}