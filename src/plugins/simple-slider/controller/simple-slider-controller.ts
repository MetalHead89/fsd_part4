import {
  ISimpleSliderController,
  ISimpleSliderModel,
  ISize,
} from '../interfaces';

import SimpleSliderView from '../view/simple-slider-view';

class SimpleSliderController implements ISimpleSliderController {
  private simpleSliderModel: ISimpleSliderModel;
  private simpleSliderView: SimpleSliderView;

  constructor(model: ISimpleSliderModel) {
    this.simpleSliderModel = model;
    this.simpleSliderView = new SimpleSliderView(this, this.simpleSliderModel);
  }

  /**
   * Установка размера слайдера
   * @param {ISize} size - новый размер слайдера
   */
  setSliderSize(size: ISize): void {
    this.simpleSliderModel.setSliderSize(size);
  }

  /**
   * Установка размера бегунка
   * @param {ISize} size - новый размер бегунка
   */
  setThumbSize(size: ISize): void {
    this.simpleSliderModel.setThumbSize(size);
  }
}

export default SimpleSliderController;
