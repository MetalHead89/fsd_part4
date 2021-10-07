import { ISize, ISliderSettings } from '../../interfaces';

export default class Model {
  private orientation;
  private type;
  private isScale;
  private isPopUps;
  private min;
  private max;
  private step;
  private scalePointSize = { width: 0, height: 0 };
  private TEST_OK = true;
  subject = {
    register: (): boolean => true,
    unsubscribe: (): boolean => true,
    notify: (): boolean => true,
  };

  constructor(settings: ISliderSettings) {
    this.orientation = settings.orientation;
    this.type = settings.type;
    this.isScale = settings.isScale;
    this.isPopUps = settings.isPopUps;
    this.min = settings.min;
    this.max = settings.max;
    this.step = settings.step;
  }

  setSliderSize(): boolean {
    return this.TEST_OK;
  }

  setThumbSize(): boolean {
    return this.TEST_OK;
  }

  setThumbPositionOnClickPosition(): boolean {
    return this.TEST_OK;
  }

  getOrientation(): string {
    return this.orientation;
  }

  getType(): string {
    return this.type;
  }

  isPopUpsEnabled(): boolean {
    return this.isPopUps;
  }

  getThumbsPositions(): boolean {
    return this.TEST_OK;
  }

  getPopUpsParams(): boolean {
    return this.TEST_OK;
  }

  getProgressBarParams(): boolean {
    return this.TEST_OK;
  }

  updateThumbsState(): boolean {
    return this.TEST_OK;
  }

  isScaleEnabled(): boolean {
    return this.isScale;
  }

  getMin(): number {
    return this.min;
  }

  getMax(): number {
    return this.max;
  }

  getStep(): number {
    return this.step;
  }

  getScalePoints(): boolean {
    return this.TEST_OK;
  }

  setScalePointSize(size: ISize): void {
    this.scalePointSize = size;
  }

  recalculateStep(): boolean {
    return this.TEST_OK;
  }
}
