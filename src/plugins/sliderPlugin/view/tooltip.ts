import { ITooltipPosition, IBorderCoords } from '../interfaces';

/**
 * Класс для управления элементами для показа значений над бегунками
 */
class Tooltip {
  private element: HTMLDivElement;

  constructor(tooltipElement: HTMLDivElement) {
    this.element = tooltipElement;
  }

  /**
   * Утанавливает новое значение над бегунком
   * @param {Number} newValue - значение позиции на которой находится бегунок
   */
  setValue(newValue: number): void {
    this.element.innerText = newValue.toString();
  }

  /**
   * Изменяет позицию значения над бегунком
   * @param {ITooltipPosition} position - позиция значения над бегунком
   */
  moveTo(position: ITooltipPosition): void {
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }

  /**
   * Удаляет HTML элемент, отображающий значение позиции на которой находится бегунок
   */
  remove(): void {
    this.element.remove();
  }

  /**
   * Возвращает координаты границ значения над бегунком
   * @returns {IBorderCoords} - Координаты границ значения над бегунком
   */
  getCoords(): IBorderCoords {
    const tooltipCoords = this.element.getBoundingClientRect();

    return {
      left: tooltipCoords.left,
      top: tooltipCoords.top,
      right: tooltipCoords.right,
      bottom: tooltipCoords.bottom,
    };
  }
}

export default Tooltip;
