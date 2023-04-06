export class Recipe {
    public name: string;
    public desciption: string;
    public image: string;

    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.desciption = desc;
        this.image = imagePath;
    }
}