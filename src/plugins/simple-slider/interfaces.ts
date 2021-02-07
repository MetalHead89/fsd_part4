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

// export interface IThumbsObserver {
//   updateThumbsPosition(): void;
// }

export interface IPosition {
  left: number;
  top: number;
}

export interface IThumbsPositions {
  thumbOne: IPosition;
  thumbTwo: IPosition;
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
