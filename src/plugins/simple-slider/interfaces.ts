export interface IThumbsObserver {
  updateThumbsPosition(): void;
}

export interface ISimpleSliderModel {
  registerObserver(observer: IThumbsObserver): void;
  removeObserver(observer: IThumbsObserver): void;
}

export interface ISimpleSliderController {}
