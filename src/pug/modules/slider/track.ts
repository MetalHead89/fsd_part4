export class Track {
    color: string = '';
    element: HTMLElement | null;

    constructor(track: HTMLElement | null) {
        this.element = track;
    }
}