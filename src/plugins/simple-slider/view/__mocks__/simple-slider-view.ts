import { ISize } from '../../interfaces';

export default class View {
  private scalePointSize = { width: 10, height: 10 };
  private wrapper: HTMLDivElement;
  private TEST_OK = true;
  subject = {
    register: (): boolean => true,
    unsubscribe: (): boolean => true,
    notify: (): boolean => true,
  };

  constructor(wrapper: HTMLDivElement) {
    this.wrapper = wrapper;
  }

  getSliderSize(): boolean {
    return this.TEST_OK;
  }

  getThumbSize(): boolean {
    return this.TEST_OK;
  }

  getThumbsPositions(): boolean {
    return this.TEST_OK;
  }

  getTrackClickPosition(): boolean {
    return this.TEST_OK;
  }

  getScaleClickPosition(): boolean {
    return this.TEST_OK;
  }

  switchToHorizontal(): boolean {
    return this.TEST_OK;
  }

  switchToVertical(): boolean {
    return this.TEST_OK;
  }

  switchToSingle(): boolean {
    return this.TEST_OK;
  }

  switchToRange(): boolean {
    return this.TEST_OK;
  }

  enablePopUps(): boolean {
    return this.TEST_OK;
  }

  disablePopUps(): boolean {
    return this.TEST_OK;
  }

  enableScale(): boolean {
    return this.TEST_OK;
  }

  disableScale(): boolean {
    return this.TEST_OK;
  }

  getScalePointSize(): ISize {
    return this.scalePointSize;
  }

  addScalePoints(): boolean {
    return this.TEST_OK;
  }

  updateThumbs(): boolean {
    return this.TEST_OK;
  }

  updatePopUps(): boolean {
    return this.TEST_OK;
  }

  updateProgressBar(): boolean {
    return this.TEST_OK;
  }
}
