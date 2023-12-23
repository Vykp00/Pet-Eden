"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    // Create User object
    constructor(usrEmail, usrPassword, fullName, usrAge, usrGender, usrCatogory, imgUrl, id) {
        this.usrEmail = usrEmail;
        this.usrPassword = usrPassword;
        this.fullName = fullName;
        this.usrAge = usrAge;
        this.usrGender = usrGender;
        this.usrCatogory = usrCatogory;
        this.imgUrl = imgUrl;
        this.id = id;
    }
}
exports.default = User;
