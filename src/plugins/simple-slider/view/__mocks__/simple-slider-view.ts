export default class View {
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

  getScalePointSize(): boolean {
    return this.TEST_OK;
  }

  addScalePoints(): boolean {
    return this.TEST_OK;
  }
}
