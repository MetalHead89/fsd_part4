interface ISize {
  width: number;
  height: number;
}

interface ISliderSettings {
  orientation: string;
  type: string;
  isScale: boolean;
  isPopUps: boolean;
  min: number;
  max: number;
  step: number;
  thumbOneValue: number;
  thumbTwoValue: number;
  sliderSize?: ISize;
  thumbSize?: ISize;
}

interface IObserver {
  update(eventType: string): void;
}

interface IObserversList {
  [index: string]: IObserver[];
}

interface ISubjectEvents {
  [key: string]: () => void;
}

interface IThumbsValues {
  thumbOne: number;
  thumbTwo: number;
}

interface ISubject {
  register(eventType: string, observer: IObserver): void;
  unsubscribe(eventType: string, observer: IObserver): void;
  notify(eventType: string): void;
}

interface IPosition {
  left: number;
  top: number;
}

interface IThumbsPositions {
  thumbOne: IPosition;
  thumbTwo: IPosition | null;
}

interface IProgressBarParams {
  position: IPosition;
  size: ISize;
}

interface IPopUpParams {
  value: number;
  position: IPosition;
}

interface IPopUps {
  popUpOne: IPopUpParams;
  popUpTwo: IPopUpParams;
}

interface IScalePointParams {
  isEmpty: boolean;
  position: IPosition;
  size: ISize;
  value: number;
}

interface IPointsSize {
  point: ISize;
  emptyPoint: ISize;
}

interface ISimpleJsSliderModel {
  subject: ISubject;
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
  getMax(): number;
  getType(): string;
  isScaleEnabled(): boolean;
  isPopUpsEnabled(): boolean;
  refreshSliderState(settings: ISliderSettings): void;
  getThumbsPositions(): IThumbsPositions;
  updateThumbsState(positions: IThumbsPositions): void;
  getProgressBarParams(): IProgressBarParams;
  getPopUpsParams(): IPopUps;
  getScalePoints(): IScalePointParams[];
  setScalePointsSize(pointsSize: IPointsSize): void;
  getOrientation(): string;
  setThumbPositionOnClickPosition(clickPosition: IPosition): void;
  recalculateStep(): void;
}

interface ISimpleJsSliderView {
  subject: ISubject;
  switchToHorizontal(): void;
  switchToVertical(): void;
  switchToSingle(): void;
  switchToRange(): void;
  disablePopUps(): void;
  enablePopUps(): void;
  enableScale(): void;
  swapThumbs(): void;
  disableScale(): void;
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  getThumbsPositions(): IThumbsPositions;
  updateThumbs(thumbsPositions: IThumbsPositions): void;
  updateProgressBar(params: IProgressBarParams): void;
  updatePopUps(params: IPopUps): void;
  getScalePointsSize(value: number): IPointsSize;
  addScalePoints(points: IScalePointParams[]): void;
  getTrackClickPosition(): IPosition;
  getScaleClickPosition(): IPosition;
}

interface IControllerParams {
  model: ISimpleJsSliderModel;
  view: ISimpleJsSliderView;
}

interface ISliderMargins {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export {
  ISize,
  ISliderSettings,
  IObserver,
  IObserversList,
  ISubjectEvents,
  IThumbsValues,
  ISubject,
  IPosition,
  IThumbsPositions,
  IProgressBarParams,
  IPopUpParams,
  IPopUps,
  IScalePointParams,
  ISimpleJsSliderModel,
  ISimpleJsSliderView,
  IControllerParams,
  ISliderMargins,
  IPointsSize,
};
