class Demo {
  private addNewSliderButton: HTMLDivElement | null = null;
  private helpImage: HTMLDivElement | null = null;
  private buttonWrapper: HTMLDivElement | null = null;

  constructor() {
    this.init();
    this.addEventListeners();
  }

  private init() {
    this.addNewSliderButton = document.querySelector('.add-new-slider-button');
    this.helpImage = document.querySelector('.help-image');
    this.buttonWrapper = document.querySelector('.button-wrapper');
  }

  private addEventListeners() {
    this.handleAddNewSliderButtonClick =
      this.handleAddNewSliderButtonClick.bind(this);

    this.addNewSliderButton?.addEventListener(
      'click',
      this.handleAddNewSliderButtonClick
    );
  }

  private handleRemoveSliderButtonClick(sliderWrapper: HTMLDivElement): void {
    sliderWrapper.remove();
    if (document.querySelectorAll('.slider-wrapper').length === 0) {
      this.addNewSliderButton?.classList.add(
        'add-new-slider-button_margin-top'
      );
    }
  }

  private handleAddNewSliderButtonClick(): void {
    if (this.buttonWrapper === null) {
      return;
    }

    this.helpImage?.remove();
    this.helpImage = null;

    this.addNewSliderButton?.classList.remove(
      'add-new-slider-button_margin-top'
    );

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider-wrapper');

    const icon = document.createElement('span');
    icon.classList.add('material-icons', 'remove-slider-button__icon');
    icon.innerText = 'clear';

    const removeSliderButton = document.createElement('button');
    removeSliderButton.classList.add('remove-slider-button');
    removeSliderButton.append(icon);
    removeSliderButton.addEventListener(
      'click',
      this.handleRemoveSliderButtonClick.bind(removeSliderButton, sliderWrapper)
    );

    sliderWrapper.append(removeSliderButton);
    this.buttonWrapper.before(sliderWrapper);

    $(sliderWrapper).simpleSlider().controlPanel();
  }
}

export default Demo;
