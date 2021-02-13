import { ISliderSettings } from '../../interfaces';
import Subject from '../../subject/subject';

class SimpleSliderModel extends Subject {
  settings: ISliderSettings | null;

  constructor() {
    super();
    this.settings = null;
  }

  fullStateUpdate(settings: ISliderSettings): void {
    this.settings = settings;
  }
}

export default SimpleSliderModel;
