/* eslint-disable arrow-body-style */
export default jest.fn(() => {
  return {
    getElement: () => {
      const div = document.createElement('div');
      div.classList.add('slider__track');
      return div;
    },
  };
});
