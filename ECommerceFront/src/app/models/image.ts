export class Image {
    image: File;
    name: string;
    active: boolean;
    path: any;
    constructor(image: File = null, name: string = null, path: string = null) {
        this.image = image;
        this.name = name;
        this.path = path;
    }
}
