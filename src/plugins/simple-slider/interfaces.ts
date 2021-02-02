export interface SimpleSliderModelInterface {
  registerObserver(observer: IThumbsObserver): void;
  removeObserver(observer: IThumbsObserver): void;
}

export interface IThumbsObserver {
  updateThumbsPosition(): void;
}
