import { SimpleSliderModelInterface, IThumbsObserver } from '../interfaces';

class SimpleSliderModel implements SimpleSliderModelInterface {
  private thumbsObservers: IThumbsObserver[];

  constructor() {
    this.thumbsObservers = new Array();
  }

  registerObserver(observer: IThumbsObserver): void {
    this.thumbsObservers.push(observer);
  }

  removeObserver(observer: IThumbsObserver) {
    this.thumbsObservers = this.thumbsObservers.filter((registeredObserver) => {
      registeredObserver !== observer;
    });
  }

  notifyThumbsMoveObservers() {
    this.thumbsObservers.forEach((registeredObserver) =>
      registeredObserver.updateThumbsPosition(),
    );
  }
}

export default SimpleSliderModel;
