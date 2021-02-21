import '@/plugins/simple-slider/simple-slider.ts';
import '@/plugins/control-panel/control-panel.ts';
import '@/demo/demo.ts';

import '@/demo/scss/style.scss';
import '@/demo/scss/normalize.scss';
import '@/fonts/fonts.scss';
import '@/plugins/simple-slider/simple-slider.scss';
import '@/plugins/control-panel/control-panel.scss';
// import '@/plugins/sliderPlugin/styles/style.scss';
// import '@/plugins/sliderPanelPlugin/styles/style.scss';
// import '@/fonts/fontsStyles.scss';

// const addNewSliderBtn = document.querySelector('.add-new-slider-btn');
// let helpImage: HTMLElement | null = document.querySelector('.help-image');
// const buttonWrapper = document.querySelector('.button-wrapper');

// function removeSlider(sliderWrapper: HTMLDivElement) {
//   sliderWrapper.remove();
//   if (document.querySelectorAll('.slider-wrapper').length === 0) {
//     if (addNewSliderBtn !== null) {
//       addNewSliderBtn.classList.add('add-new-slider-btn_margin-top');
//     }
//   }
// }

// function clickToAddNewSliderBtn(): void {
//   if (buttonWrapper !== null) {
//     if (helpImage != null) {
//       helpImage.remove();
//       helpImage = null;
//     }

//     if (addNewSliderBtn != null) {
//       addNewSliderBtn.classList.remove('add-new-slider-btn_margin-top');
//     }

//     const sliderWrapper = document.createElement('div');
//     sliderWrapper.classList.add('slider-wrapper');
//     buttonWrapper.before(sliderWrapper);

//     const icon = document.createElement('span');
//     icon.classList.add('material-icons', 'remove-slider-button__icon');
//     icon.innerText = 'clear';

//     const removeSliderButton = document.createElement('button');
//     removeSliderButton.classList.add('remove-slider-button');
//     removeSliderButton.append(icon);
//     removeSliderButton.addEventListener('click', removeSlider.bind(removeSliderButton, sliderWrapper));
//     sliderWrapper.append(removeSliderButton);

//     $(sliderWrapper).incredibleSliderPlugin();
//     $(sliderWrapper).sliderControlPanel();
//   }
// }

// if (addNewSliderBtn !== null) {
//   addNewSliderBtn.addEventListener('click', clickToAddNewSliderBtn);
// }
