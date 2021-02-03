export interface ISize {
  width: number;
  height: number;
}

export interface IThumbsObserver {
  updateThumbsPosition(): void;
}

export interface ISimpleSliderModel {
  registerObserver(observer: IThumbsObserver): void;
  removeObserver(observer: IThumbsObserver): void;
  notifyThumbsMoveObservers(): void;
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
}

export interface ISimpleSliderController {
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
}
