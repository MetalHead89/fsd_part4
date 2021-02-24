export interface ISize {
  width: number;
  height: number;
}

export interface ISliderSettings {
  orienation: string;
  type: string;
  scale: boolean;
  popUps: boolean;
  min: number;
  max: number;
  step: number;
  thumbOneValue: number;
  thumbTwoValue: number;
  sliderSize: ISize;
  thumbSize: ISize;
}

export interface IElement {
  getElement(): HTMLDivElement;
  getSize(): ISize;
}

export interface IObserver {
  update(eventType: string): void;
}

export interface IObserversList {
  [index: string]: IObserver[];
}

export interface IThumbsValues {
  thumbOne: number;
  thumbTwo: number;
}

export interface ISubject {
  register(eventType: string, observer: IObserver): void;
  remove(eventType: string, observer: IObserver): void;
  notify(eventType: string): void;
}

export interface IPosition {
  left: number;
  top: number;
}

export interface IThumbsPositions {
  thumbOne: IPosition;
  thumbTwo: IPosition;
}

export interface IProgressBarParams {
  position: IPosition;
  size: ISize;
}

export interface IPopUpParams {
  value: number;
  position: IPosition;
}

export interface IPopUps {
  popUpOne: IPopUpParams;
  popUpTwo: IPopUpParams;
}

export interface IScalePointParams {
  position: IPosition;
  paddings: IPosition;
  size: ISize;
  value: number;
}

export interface ISimpleSliderModel extends ISubject {
  getMax(): number;
  refreshSliderState(settings: ISliderSettings): void;
  getThumbsPos(): IThumbsPositions;
  updateThumbsState(positions: IThumbsPositions): void;
  getProgressBarParams(): IProgressBarParams;
  getPopUpsParams(): IPopUps;
  getScalePoints(scalePointSize: ISize): IScalePointParams[];
}

export interface ISimpleSliderView extends ISubject {
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  getThumbsPos(): IThumbsPositions;
  updateThumbs(thumbsPositions: IThumbsPositions): void;
  updateProgressBar(params: IProgressBarParams): void;
  updatePopUps(params: IPopUps): void;
  getScalePointSize(value: number): ISize;
  addScalePoints(points: IScalePointParams[]): void;
}

export interface IControllerParams {
  model: ISimpleSliderModel;
  view: ISimpleSliderView;
  settings: ISliderSettings;
}
