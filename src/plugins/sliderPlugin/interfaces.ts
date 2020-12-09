export interface ISliderSettings {
    'orienation': string,
    'type': string,
    'scale': boolean,
    'tooltips': boolean,
    'min': number,
    'max': number,
    'step': number
}

export interface IObservable {
    [index: string]: Function[]
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









// export interface IViewSliderOptions {
//     'type': string,
//     'orientation': string
// }

// export interface ISliderSize {
//     'width': number,
//     'height': number
// }

// export interface IScaleSize {
//     'width': number,
//     'height': number
// }

// export interface IThumbShift {
//     'shiftX': number,
//     'shiftY': number
// }

// export interface IThumbSize {
//     'width': number,
//     'height': number
// }

// export interface IThumbPosition {
//     'left': number,
//     'top': number
// }

// export interface ICursorPosition {
//     'x': number,
//     'y': number
// }

// export interface IScalePointSize {
//     'width': number,
//     'height': number
// }

// export interface IScalePointSettings {
//     'position': number,
//     'scalePointSize': number,
//     'scalePointValue': number
// }

// export interface IProgressBarPosition {
//     'orientation': string,
//     'start': number,
//     'end': number
// }

// // export interface IGroupedSettings {
// //     'sliderSettings': ISliderSettings
// //     'thumbSettings': IThumbSettings,
// //     'scaleSettings': IScaleSettings
// // }

// // export interface INewSliderOptions {
// //     'sliderPosition': HTMLElement,
// //     'settings': IGroupedSettings
// // }

// // export interface ISliderComponents {
// //     'sliderElem': HTMLElement,
// //     'trackElem': HTMLElement,
// //     'progressBar': HTMLElement,
// //     'thumbElem': HTMLElement,
// //     'scaleElem': HTMLElement
// // }

// // export interface IThumbSettings {
// //     'minValue': number,
// //     'maxValue': number,
// //     'step': number
// // }

// // export interface ISliderSettings {
// //     'orientation': string,
// //     'type': string,
// // }

// // export interface IScaleSettings {
// //     'displayed': boolean,
// //     'minValue': number,
// //     'maxValue': number,
// // }