const addNewSliderBtn = document.querySelector('.add-new-slider-btn');
let helpImage = document.querySelector('.help-image');
const buttonWrapper = document.querySelector('.button-wrapper');

function removeSlider(sliderWrapper: HTMLDivElement) {
  sliderWrapper.remove();
  if (document.querySelectorAll('.slider-wrapper').length === 0) {
    addNewSliderBtn?.classList.add('add-new-slider-btn_margin-top');
  }
}

function clickToAddNewSliderBtn(): void {
  if (buttonWrapper !== null) {
    helpImage?.remove();
    helpImage = null;

    addNewSliderBtn?.classList.remove('add-new-slider-btn_margin-top');

    const sliderWrapper = document.createElement('div');
    sliderWrapper.classList.add('slider-wrapper');
    buttonWrapper.before(sliderWrapper);

    const icon = document.createElement('span');
    icon.classList.add('material-icons', 'remove-slider-button__icon');
    icon.innerText = 'clear';

    const removeSliderButton = document.createElement('button');
    removeSliderButton.classList.add('remove-slider-button');
    removeSliderButton.append(icon);
    removeSliderButton.addEventListener(
      'click',
      removeSlider.bind(removeSliderButton, sliderWrapper),
    );
    sliderWrapper.append(removeSliderButton);

    $(sliderWrapper)
      .simpleSlider({ step: 2, min: 3, orientation: 'vertical' })
      .controlPanel();
  }
}

addNewSliderBtn?.addEventListener('click', clickToAddNewSliderBtn);
