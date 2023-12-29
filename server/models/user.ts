// This is where we create User class
// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
// Create a 
type Animals = "Dog" | "Cat" | "Rodent" | "Bird" | "Others";
type Genders = "Male" | "Female" | "Others";
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
        public id?: ObjectId, // _id is set to be optional with '?' at code lvl
        ) {}
}