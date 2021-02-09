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

export interface ISimpleSliderModel extends ISubject {
  fullStateUpdate(settings: ISliderSettings): void;
  getThumbsPos(): IThumbsPositions;
  updateThumbsState(positions: IThumbsPositions): void;
}

export interface ISimpleSliderView extends ISubject {
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  updatedThumbs(thumbsPositions: IThumbsPositions): void;
  getThumbsPos(): IThumbsPositions;
}

export interface IControllerParams {
  model: ISimpleSliderModel;
  view: ISimpleSliderView;
  settings: ISliderSettings;
}
