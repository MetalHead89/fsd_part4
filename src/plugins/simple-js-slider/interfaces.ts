import { IObserverNew, IThumbsPositionsNew } from './new-interfaces';

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

interface IPopUpsValues {
  popUpOne: number;
  popUpTwo: number;
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
  position: IPosition;
  size: ISize;
  value: number;
}

interface IPointParams {
  value: number;
  position: number;
}

interface IFullPointParams {
  value: number;
  size: ISize;
  position: IPosition;
}

interface IFullPointParams {
  position: IPosition;
  value: number;
}

interface ISimpleJsSliderModel {
  observer: IObserverNew;
  getSliderSettings(): ISliderSettings;
  updateThumbsValues({ thumbOne, thumbTwo }: IThumbsPositionsNew): void;
  getThumbsPositionsNew(): IThumbsPositionsNew;
  getThumbValues(): IThumbsValues;
  getPointsParams(): IPointParams[];
  updateSliderSettings(settings: ISliderSettings): void;

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
  setScalePointSize(size: ISize): void;
  getOrientation(): string;
  setThumbPositionOnClickPosition(clickPosition: IPosition): void;
  recalculateStep(): void;
}

interface ISimpleJsSliderView {
  observer: IObserverNew;
  moveThumbs({ thumbOne, thumbTwo }: IThumbsPositionsNew): void;
  updatePopUps(values: IThumbsValues): void;
  updateProgressBar(): void;
  updateScale(pointsParams: IPointParams[]): void;

  subject: ISubject;
  switchToHorizontal(): void;
  switchToVertical(): void;
  switchToSingle(): void;
  switchToRange(): void;
  disablePopUps(): void;
  enablePopUps(): void;
  enableScale(): void;
  // swapThumbs(): void;
  disableScale(): void;
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  getThumbsPositions(): IThumbsPositions;
  updateThumbs(thumbsPositions: IThumbsPositions): void;
  // updateProgressBar(params: IProgressBarParams): void;
  // updatePopUps(params: IPopUps): void;
  // getScalePointSize(value: number): ISize;
  // addScalePoints(points: IScalePointParams[]): void;
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
  IPopUpsValues,
  IPointParams,
  IFullPointParams,
};
