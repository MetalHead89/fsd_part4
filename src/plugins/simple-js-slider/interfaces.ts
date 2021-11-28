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

interface ISubjectEvents {
  [key: string]: () => void;
}

interface IThumbsValues {
  thumbOne: number;
  thumbTwo: number;
}

interface IPosition {
  left: number;
  top: number;
}

interface IThumbsPositions {
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

interface ISimpleJsSliderModel {
  observer: IObserverNew;
  getSliderSettings(): ISliderSettings;
  getObserver(): IObserverNew;
  updateThumbsValues({ thumbOne, thumbTwo }: IThumbsPositionsNew): void;
  getThumbsPositionsNew(): IThumbsParams;
  getThumbValues(): IThumbsValues;
  getPointsParams(): IPointParams[];
  updateSliderSettings(settings: ISliderSettings): void;
  getType(): string;
  isScaleEnabled(): boolean;
  isPopUpsEnabled(): boolean;
  getOrientation(): string;
}

interface ISimpleJsSliderView {
  observer: IObserverNew;
  moveThumbs({ thumbOne, thumbTwo }: IThumbsParams): void;
  updatePopUps(values: IThumbsValues): void;
  updateProgressBar(): void;
  updateScale(pointsParams: IPointParams[]): void;
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
  getThumbsPositions(): IThumbsPositions;
  updateThumbs(thumbsPositions: IThumbsPositions): void;
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
  ISubjectEvents,
  IThumbsValues,
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
  IThumbsParams,
};
