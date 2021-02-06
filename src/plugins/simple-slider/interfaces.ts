export interface ISize {
  width: number;
  height: number;
}

export interface IThumbsObserver {
  updateThumbsPosition(): void;
}

export interface IThumbPosition {
  left: number;
  top: number;
}

export interface IThumbsPositions {
  thumbOne: IThumbPosition;
  thumbTwo: IThumbPosition;
}

export interface ISimpleSliderModel {
  registerObserver(observer: IThumbsObserver): void;
  removeObserver(observer: IThumbsObserver): void;
  notifyThumbsMoveObservers(): void;
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
  getThumbsPositions(): IThumbsPositions;
}

export interface ISimpleSliderView {
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  updatedThumbs(thumbsPositions: IThumbsPositions): void;
}
