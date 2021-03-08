/* eslint-disable arrow-body-style */
export default jest.fn(() => {
  return {
    subject: {
      register: () => true,
    },
    getElement: () => {
      const div = document.createElement('div');
      div.classList.add('slider__thumb');
      return div;
    },
    getSize: () => true,
    getPosition: () => true,
    resetZIndex: () => true,
    moveTo: () => true,
  };
});
