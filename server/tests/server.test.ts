import { describe, expect, jest, test, afterAll} from '@jest/globals';
import { connectToServer } from '../db/services.db';
import DBManager from "../db/conn.db";
import request from 'supertest';
import app from '../app';

describe('Server is loaded at PORT', () => {
    test('It should get status code 200 from GET method', async () => {
        const res:request.Response = await request(app).get('/')
        expect(res.statusCode).toBe(200)
    });
});

describe('Testing Registration POST /api/v1/register', () => {
    afterAll ( async () => {
        // Delete all test database with matched "test"
        await (await connectToServer('users')).deleteMany({ fullName : { $regex: "test" }});
        
        // Close MongoDB connection
        await DBManager.connection?.close();
    });

    test('It should register new user and return successfull message', async () => {
        const res: request.Response = await request(app).post('/api/v1/register').send({
            usrEmail: 'john.test@gmail.com',
            usrPassword: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            fullName: 'Max test',
            usrAge: 3,
            usrGender: 'male',
            usrCategory: "Dog",
            imgUrl: 'http://someurl.png'
        })
        // Expect to get 201 status code
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')
        console.log(`Response body from /api/v1/register/: ${res.body.message}`)
        expect(res.body).toEqual({ message: 'Successfully register new user' })
    })

    test('It should response { message: "Email already exists!" } if usrEmail has already exist in MongoDB', async () => {
        const res: request.Response = await request(app).post('/api/v1/register').send({
            usrEmail: 'john.test@gmail.com',
            usrPassword: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            fullName: 'Max test',
            usrAge: 3,
            usrGender: 'male',
            usrCategory: "Dog",
            imgUrl: 'http://someurl.png'
        })
        // Expect to get 409 Conflict status code
        .expect(409)
        .expect('Content-Type', 'application/json; charset=utf-8')
        console.log(`Response body from /api/v1/register/: ${res.body.message}`)
        expect(res.body).toEqual({ message: 'Email already exists!' })
    })
});