class PopUp {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('slider__pop-up', 'slider__pop-up_horizontal');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  update(value: number): void {
    this.element.innerHTML = `${value}`;
  }
}

export default PopUp;
