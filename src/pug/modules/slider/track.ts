export class Track {
    private color: string = '';
    private element: HTMLElement | null;

    constructor(track: HTMLElement | null) {
        this.element = track;
    }
}