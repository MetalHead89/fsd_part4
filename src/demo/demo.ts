const addNewSliderButton = document.querySelector('.add-new-slider-button');
let helpImage = document.querySelector('.help-image');
const buttonWrapper = document.querySelector('.button-wrapper');

function removeSlider(sliderWrapper: HTMLDivElement) {
  sliderWrapper.remove();
  if (document.querySelectorAll('.slider-wrapper').length === 0) {
    addNewSliderButton?.classList.add('add-new-slider-button_margin-top');
  }
}

function clickToaddNewSliderButton(): void {
  if (buttonWrapper === null) {
    return;
  }

  helpImage?.remove();
  helpImage = null;

  addNewSliderButton?.classList.remove('add-new-slider-button_margin-top');

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
    removeSlider.bind(removeSliderButton, sliderWrapper)
  );
  sliderWrapper.append(removeSliderButton);

  $(sliderWrapper).simpleSlider().controlPanel();
}

addNewSliderButton?.addEventListener('click', clickToaddNewSliderButton);
