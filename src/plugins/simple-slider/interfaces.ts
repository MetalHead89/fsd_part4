export interface ISize {
  width: number;
  height: number;
}

export interface ISliderSettings {
  orientation: string;
  type: string;
  scale: boolean;
  popUps: boolean;
  min: number;
  max: number;
  step: number;
  thumbOneValue: number;
  thumbTwoValue: number;
  sliderSize?: ISize;
  thumbSize?: ISize;
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
  unsubscribe(eventType: string, observer: IObserver): void;
  notify(eventType: string): void;
}

export interface IPosition {
  left: number;
  top: number;
}

export interface IThumbsPositions {
  thumbOne: IPosition;
  thumbTwo: IPosition | null;
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
  size: ISize;
  value: number;
}

export interface ISimpleSliderModel {
  subject: ISubject;
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
  getMax(): number;
  getType(): string;
  getPopUpsState(): boolean;
  getScaleState(): boolean;
  refreshSliderState(settings: ISliderSettings): void;
  getThumbsPos(): IThumbsPositions;
  updateThumbsState(positions: IThumbsPositions): void;
  getProgressBarParams(): IProgressBarParams;
  getPopUpsParams(): IPopUps;
  getScalePoints(scalePointSize: ISize): IScalePointParams[];
  getOrientation(): string;
  setThumbPosOnClickPos(clickPosition: IPosition): void;
}

export interface ISimpleSliderView {
  subject: ISubject;
  switchToHorizontal(): void;
  switchToVertical(): void;
  switchToSingle(): void;
  switchToRange(): void;
  disablePopUps(): void;
  enablePopUps(): void;
  enableScale(): void;
  disableScale(): void;
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  getThumbsPos(): IThumbsPositions;
  updateThumbs(thumbsPositions: IThumbsPositions): void;
  updateProgressBar(params: IProgressBarParams): void;
  updatePopUps(params: IPopUps): void;
  getScalePointSize(value: number): ISize;
  addScalePoints(points: IScalePointParams[]): void;
  getTrackClickPosition(): IPosition;
  getScaleClickPosition(): IPosition;
}

export interface IControllerParams {
  model: ISimpleSliderModel;
  view: ISimpleSliderView;
}

export interface ISliderMargins {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
