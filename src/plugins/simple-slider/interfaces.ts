export interface IObserver {
  update(): void
}

interface ISubject {
  registerObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyThumbsMoveObservers(): void;
}

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

export interface ISimpleSliderModel extends ISubject {
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
  getThumbsPositions(): IThumbsPositions;
}

export interface ISimpleSliderView extends ISubject {
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  updatedThumbs(thumbsPositions: IThumbsPositions): void;
}
