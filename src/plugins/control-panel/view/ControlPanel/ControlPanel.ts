class ControlPanel {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('control-panel');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  append(control: HTMLDivElement): void {
    this.element.append(control);
  }

  switchToHorizontal(): void {
    this.element.classList.remove('control-panel_orientation_vertical');
    this.element.classList.add('control-panel_orientation_horizontal');
  }

  switchToVertical(): void {
    this.element.classList.remove('control-panel_orientation_horizontal');
    this.element.classList.add('control-panel_orientation_vertical');
  }
}

export default ControlPanel;
