import { ISliderSettings } from '../../interfaces';

export default class Model {
  private orientation;
  private type;
  private scale;
  private popUps;
  private min;
  private max;
  private step;
  private TEST_OK = true;
  subject = {
    register: (): boolean => true,
    unsubscribe: (): boolean => true,
    notify: (): boolean => true,
  };

  constructor(settings: ISliderSettings) {
    this.orientation = settings.orientation;
    this.type = settings.type;
    this.scale = settings.scale;
    this.popUps = settings.popUps;
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

  setThumbPosOnClickPos(): boolean {
    return this.TEST_OK;
  }

  getOrientation(): string {
    return this.orientation;
  }

  getType(): string {
    return this.type;
  }

  getPopUpsState(): boolean {
    return this.popUps;
  }

  getThumbsPos(): boolean {
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

  getScaleState(): boolean {
    return this.scale;
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
}
