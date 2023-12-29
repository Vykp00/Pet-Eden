// Create manual schema to validate new User
// The schema return an array
import { body } from 'express-validator'

// Define animals and genders types for schema
const animals: string[] = ["Dog", "Cat", "Rodent", "Bird", "Others"];

const genders: string[] = ["Male", "Female", "Others"];

const newUserSchema: any[] = [
    body('usrEmail').isEmail().withMessage('Your email must be a valid email address'), // Is valid Email
    body('usrPassword').isStrongPassword({minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('Password must be at least 8 characters, and must contain at least an uppercase letter, a number, and a symbol'), // Must be a strong password

    body('fullName').notEmpty().isString().withMessage('Full name must not be empty'), // Full name is not Empty
    body('usrAge').isInt({min: 0}).withMessage('Age must be a number and cannot be lower than 0'), // Age must be min 0
    body('usrGender').default('Others').isIn(genders).withMessage('Gender must have a valid input of Male, Female or Others'), // Genders contain a valid from genders Array
    body('usrCategory').default('Others').isIn(animals).withMessage('Animal type must be from one of the available options'), // Genders contain a valid from animals Array
    body('imgUrl').default('https://cdn.pixabay.com/photo/2020/12/20/04/06/bear-5846065_1280.jpg').isURL({ protocols: ['https'] }).withMessage('Picture URL must be valid with https protocol') // Image URL must have valid https protocol
];

const logInSchema: any[] = [
    body('usrEmail').isEmail().withMessage('Your email must be a valid email address'), // Is valid Email
    body('usrPassword').isStrongPassword({minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('Password must be at least 8 characters, and must contain at least an uppercase letter, a number, and a symbol'), // Must be a strong password
];
export { newUserSchema, logInSchema };