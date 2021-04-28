export class Technology {

    _id: string;
    title: string;
    url: string;
    category: string;

    constructor(_id = "", title = "", url = "", category = "") {
        this._id = _id;
        this.title = title;
        this.url = url;
        this.category = category;
    }
}
