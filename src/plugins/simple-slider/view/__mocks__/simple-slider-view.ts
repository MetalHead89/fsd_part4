import { ISize, IThumbsPositions } from '../../interfaces';
import Subject from '../../subject/subject';

class SimpleSliderView extends Subject {
  private wrapper: HTMLDivElement;
  private sliderSize = { width: 500, height: 10 };
  private thumbSize = { width: 20, height: 20 };
  private thumbOnePos = { left: 50, top: 0 };
  private thumbTwoPos = { left: 450, top: 0 };

  constructor(wrapper: HTMLDivElement) {
    super();
    this.wrapper = wrapper;
  }

  getSliderSize(): ISize {
    return this.sliderSize;
  }

  getThumbSize(): ISize {
    return this.thumbSize;
  }

  getThumbsPos(): IThumbsPositions {
    return {
      thumbOne: this.thumbOnePos,
      thumbTwo: this.thumbTwoPos,
    };
  }

  updateThumbs(thumbsPositions: IThumbsPositions): void {}

  updateProgressBar(params: IProgressBarParams): void {}

  updatePopUps(params: IPopUps): void {}
}

export default SimpleSliderView;
