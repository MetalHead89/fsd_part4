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
}

type SimpleJSSliderActions = {
  init: ISliderSettings;
  getSliderSettings: string;
  updateSliderSettings: ISliderSettings;
  register: () => void;
};

type SimpleJSSliderAPIMethods = {
  init(options: ISliderSettings): void;
  getSliderSettings(): ISliderSettings;
  updateSliderSettings(sliderSettings: ISliderSettings): void;
  register(callback: () => void): void;
};

interface ISubjectEvents {
  [key: string]: () => void;
}

interface IThumbsValues {
  thumbOne: number;
  thumbTwo: number;
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

type Subscriber<T> = <K extends keyof T>(args: T[K]) => void;

type ModelEvents = { modelIsUpdated: ISliderSettings; settingsIsUpdated: ISliderSettings };

type ViewEvents = { thumbIsDragged: IThumbsPositions };

type UIControlEvents = {
  clickToScale: IPosition;
  thumbIsDragged: string;
  clickToTrack: IPosition;
};

interface IObserver<T extends Record<string, unknown>> {
  register<K extends keyof T>(event: K, func: Subscriber<T>): void;
  unsubscribe<K extends keyof T>(event: K, func: Subscriber<T>): void;
}

interface ISimpleJsSliderModel extends IObserver<ModelEvents> {
  register<K extends keyof ModelEvents>(event: K, func: Subscriber<ModelEvents>): void;
  unsubscribe<K extends keyof ModelEvents>(event: K, func: Subscriber<ModelEvents>): void;
  getSliderSettings(): ISliderSettings;
  updateThumbsValues({ thumbOne, thumbTwo }: IThumbsPositions): void;
  getThumbsPositions(): IThumbsParams;
  getThumbValues(): IThumbsValues;
  getPointsParams(): IPointParams[];
  updateSliderSettings(settings: ISliderSettings): void;
}

interface ISimpleJsSliderView extends IObserver<ViewEvents> {
  register<K extends keyof ViewEvents>(event: K, func: Subscriber<ViewEvents>): void;
  unsubscribe<K extends keyof ViewEvents>(event: K, func: Subscriber<ViewEvents>): void;
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
  SimpleJSSliderActions,
  SimpleJSSliderAPIMethods,
};
