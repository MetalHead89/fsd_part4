export interface ISize {
  width: number;
  height: number;
}

export interface ISliderSettings {
  orienation: string;
  type: string;
  scale: boolean;
  tooltips: boolean;
  min: number;
  max: number;
  step: number;
  thumbOneValue: number;
  thumbTwoValue: number;
  sliderSize: ISize;
  thumbSize: ISize;
}

export interface IObserver {
  update(eventType: string): void;
}

export interface IObserversList {
  [index: string]: IObserver[];
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

export interface ISimpleSliderModel extends ISubject {
  fullStateUpdate(settings: ISliderSettings): void;
  getThumbsPos(): IThumbsPositions;
  updateThumbsState(positions: IThumbsPositions): void;
  getProgressBarParams(): IProgressBarParams;
}

export interface ISimpleSliderView extends ISubject {
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  getThumbsPos(): IThumbsPositions;
  updateThumbs(thumbsPositions: IThumbsPositions): void;
}

export interface IControllerParams {
  model: ISimpleSliderModel;
  view: ISimpleSliderView;
  settings: ISliderSettings;
}
