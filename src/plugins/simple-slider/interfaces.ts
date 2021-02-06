export interface IObserver {
  update(eventType: string): void;
}

export interface IObserversList {
  [index: string]: IObserver[];
}

export interface ISubject {
  registerObserver(eventType: string, observer: IObserver): void;
  removeObserver(eventType: string, observer: IObserver): void;
  notifyThumbsMoveObservers(eventType: string): void;
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

export interface ISimpleSliderModel {
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
  getThumbsPositions(): IThumbsPositions;
}

export interface ISimpleSliderView extends ISubject {
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  updatedThumbs(thumbsPositions: IThumbsPositions): void;
}
