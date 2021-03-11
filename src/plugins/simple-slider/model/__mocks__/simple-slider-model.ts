import { ISliderSettings } from '../../interfaces';

export default class Model {
  private settings: ISliderSettings;
  private TEST_OK = true;
  subject = {
    register: (): boolean => true,
    unsubscribe: (): boolean => true,
    notify: (): boolean => true,
  };

  constructor(settings: ISliderSettings) {
    this.settings = settings;
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
    return this.settings.orientation;
  }

  getType(): string {
    return this.settings.type;
  }

  getPopUpsState(): boolean {
    return this.settings.popUps;
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
    return this.settings.scale;
  }

  getMin(): number {
    return this.settings.min;
  }

  getMax(): number {
    return this.settings.max;
  }

  getStep(): number {
    return this.settings.step;
  }

  getScalePoints(): boolean {
    return this.TEST_OK;
  }
}
