export interface SimpleSliderModelInterface {
  registerObserver(observer: IThumbsMoveObserver): void;
  removeObserver(observer: IThumbsMoveObserver): void;
}

export interface IThumbsMoveObserver {
  updateThumbsPosition(): void;
}
