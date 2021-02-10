export class Contact {

    constructor(public _id?: string, public name: string = '', public email: string = '', public phone: string = '') {

    }

    // setId(length = 24) {
    //     // Implement your own set Id
    //     // this._id = makeId()
    //     var text = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     for (var i = 0; i < length; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
    //     return text;
    // }
}