import { SimpleSliderModelInterface, IThumbsMoveObserver } from '../interfaces';

class SimpleSliderModel implements SimpleSliderModelInterface {
  private thumbsMoveObserver: IThumbsMoveObserver[];

  constructor() {
    this.thumbsMoveObserver = new Array();
  }

  registerObserver(observer: IThumbsMoveObserver): void {
    this.thumbsMoveObserver.push(observer);
  }

  removeObserver(observer: IThumbsMoveObserver) {
    this.thumbsMoveObserver = this.thumbsMoveObserver.filter(
      (registeredObserver) => {
        registeredObserver !== observer;
      },
    );
  }

  notifyThumbsMoveObservers() {
    this.thumbsMoveObserver.forEach((registeredObserver) =>
      registeredObserver.updateThumbsPosition(),
    );
  }
}

export default SimpleSliderModel;
