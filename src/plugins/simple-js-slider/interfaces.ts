/* eslint-disable @typescript-eslint/no-explicit-any */

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

interface ISubjectEvents {
  [key: string]: () => void;
}

interface IThumbsValues {
  thumbOne: number;
  thumbTwo: number;
}

interface IObserver {
  register(event: string, func: (args?: any) => void): void;
  unsubscribe(event: string, func: (args?: any) => void): void;
}

interface IObserversList {
  [key: string]: ((args?: any) => void)[];
}

interface IThumbsPositions {
  thumbOne: number;
  thumbTwo: number | null;
}

interface IPosition {
  left: number;
  top: number;
}

interface IFullThumbsPositions {
  thumbOne: IPosition;
  thumbTwo: IPosition | null;
}

interface IThumbsParams {
  thumbOne: { position: number; value: number };
  thumbTwo: { position: number; value: number };
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

type Subscriber<T> = <K extends keyof T>(args?: T[K]) => void;

type ModelEvents = { modelIsUpdated: string; settingsIsUpdated: string };

type ViewEvents = { thumbIsDragged: IThumbsPositions };

type UIControlEvents = {
  clickToScale: IPosition;
  thumbIsDragged: string;
  clickToTrack: IPosition;
};

interface ISimpleJsSliderModel {
  register(event: string, func: (args?: any) => void): void;
  unsubscribe(event: string, func: (args?: any) => void): void;
  getSliderSettings(): ISliderSettings;
  updateThumbsValues({ thumbOne, thumbTwo }: IThumbsPositions): void;
  getThumbsPositions(): IThumbsParams;
  getThumbValues(): IThumbsValues;
  getPointsParams(): IPointParams[];
  updateSliderSettings(settings: ISliderSettings): void;
  getType(): string;
  isScaleEnabled(): boolean;
  isPopUpsEnabled(): boolean;
  getOrientation(): string;
}

interface ISimpleJsSliderView {
  register(event: string, func: (args?: any) => void): void;
  unsubscribe(event: string, func: (args?: any) => void): void;
  moveThumbs({ thumbOne, thumbTwo }: IThumbsParams): void;
  updatePopUps(values: IThumbsValues): void;
  updateProgressBar(): void;
  updateScale(pointsParams: IPointParams[]): void;
  switchOrientation(orientation: string): void;
  switchToSingle(): void;
  switchToRange(): void;
  disablePopUps(): void;
  enablePopUps(): void;
  enableScale(): void;
  disableScale(): void;
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  getThumbsPositions(): IFullThumbsPositions;
  updateThumbs(thumbsPositions: IFullThumbsPositions): void;
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
  ModelEvents,
  ViewEvents,
  UIControlEvents,
  Subscriber,
  ISliderSettings,
  ISubjectEvents,
  IThumbsValues,
  IPosition,
  IThumbsPositions,
  IFullThumbsPositions,
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
  IThumbsParams,
  IObserver,
  IObserversList,
};
