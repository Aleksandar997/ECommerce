import { Image } from 'src/app/models/image';

export class CarouselBase {
    path: Array<Image>;
    active: boolean;

    constructor(path = new Array<Image>(), active = false) {
        this.path = path;
        this.active = active;
    }
}

export class CarouselBaseList extends Array<CarouselBase> {
    setActive(element) {
        if (!this[element]) {
            return;
        }
        this[element].active = true;
    }
    populate(images: Array<Image>) {
        if (!images) {
            return;
        }
        for (let index = 0; images.length > 0; index++) {
            const i = images[index];
            if (index % 4 === 0) {
                this.push(new CarouselBase(images.splice(0, 4), false));
            }
        }
        this.setActive(0);
    }
    clear() {
        this.splice(0, this.length);
    }
}
