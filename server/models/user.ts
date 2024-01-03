// This is where we create User class
// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
// Create a 
export type Animals = "Dog" | "Cat" | "Rodent" | "Bird" | "Others";
export type Genders = "Male" | "Female" | "Others";
export type Roles = "USER" | "ADMIN";
export default class User {
    // Create User object
    constructor(
        public usrEmail: string,
        public usrPassword: string,
        public fullName: string,
        public usrAge: number,
        public usrGender: Genders,
        public usrCategory: Animals,
        public imgUrl: string,
        public role: Roles,
        public id?: ObjectId, // _id is set to be optional with '?' at code lvl
    ) { }
}