export default class Element {
  protected element: HTMLDivElement;
  protected mainClass: string;
  protected TEST_OK = true;

  constructor(name: string) {
    const element = document.createElement('div');
    this.element = element;
    this.mainClass = name;
    this.element.classList.add(`${name}`);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  getSize(): boolean {
    return this.TEST_OK;
  }

  switchToHorizontal(): void {
    this.element.classList.remove(`${this.mainClass}_vertical`);
    this.element.classList.add(`${this.mainClass}_horizontal`);
  }

  switchToVertical(): void {
    this.element.classList.remove(`${this.mainClass}_horizontal`);
    this.element.classList.add(`${this.mainClass}_vertical`);
  }

  remove(): void {
    this.element.remove();
  }

  getOrientation(): boolean {
    return this.TEST_OK;
  }
}
