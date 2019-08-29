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
        this[element].active = true;
    }
    populate(images: Array<Image>) {
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; images.length > 0; index++) {
            const i = images[index];
            if (index % 4 === 0) {
                this.push(new CarouselBase(images.splice(0, 4), false));
            }
        }
        this.setActive(0);
    }
}
