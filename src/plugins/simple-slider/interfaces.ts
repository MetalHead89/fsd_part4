export interface IThumbsObserver {
  updateThumbsPosition(): void;
}

export interface SimpleSliderModelInterface {
  registerObserver(observer: IThumbsObserver): void;
  removeObserver(observer: IThumbsObserver): void;
}

export interface SimpleSliderControllerInterface {}
