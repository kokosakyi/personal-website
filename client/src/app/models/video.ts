export class Video {
    private _id: string;
    private _title: string;

    constructor(public id: string, public title: string) {
        this._id = id;
        this._title = title;
    }
}