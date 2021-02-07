export interface IObserver {
  update(eventType: string): void;
}

export interface IObserversList {
  [index: string]: IObserver[];
}

export interface ISubject {
  register(eventType: string, observer: IObserver): void;
  remove(eventType: string, observer: IObserver): void;
  notify(eventType: string): void;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IPosition {
  left: number;
  top: number;
}

export interface IThumbsPositions {
  thumbOne: IPosition;
  thumbTwo: IPosition;
}

export interface ISimpleSliderModel extends ISubject {
  setSliderSize(size: ISize): void;
  setThumbSize(size: ISize): void;
  getThumbsPos(): IThumbsPositions;
  setThumbsPos(positions: IThumbsPositions): void;
}

export interface ISimpleSliderView extends ISubject {
  getThumbSize(): ISize;
  getSliderSize(): ISize;
  updatedThumbs(thumbsPositions: IThumbsPositions): void;
  getThumbsPos(): IThumbsPositions;
}
