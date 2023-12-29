import { describe, expect, jest, test, afterAll, beforeAll} from '@jest/globals';
import { connectToServer } from '../db/services.db';
import DBManager from "../db/conn.db";
import request from 'supertest';
import app from '../app';
import * as mongoDb from 'mongodb'


describe('Testing POST api/v1/login and JWT', () => {
    //let connection: mongoDb.Collection<mongoDb.BSON.Document>;
    beforeAll (async () => {
        // Connect to DB
        //connection = await connectToServer('users');
        const preRequest: request.Response = await request(app).post('/api/v1/register').send({
            usrEmail: 'danny.test@gmail.com',
            usrPassword: 'HelloDanny@12356',
            fullName: 'Lucy test',
            usrAge: 3,
            usrGender: 'Female',
            usrCategory: "Cat",
        })
    });

    afterAll (async () => {
        // Delete all test database with matched "test"
        await (await connectToServer('users')).deleteMany({ fullName : { $regex: "test" }});
        
        // Close MongoDB connection
        await DBManager.connection?.close();
    });

    test('It should return JWT token and return Welcomeback message with user Fullname', async () => {
        const res: request.Response = await request(app).post('/api/v1/login').send({
            usrEmail: 'danny.test@gmail.com',
            usrPassword: 'HelloDanny@12356',
        })  
        // Expect to get 200 status code
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        console.log(`Response body from /api/v1/login/: ${res.body.message}`);
        // Expect to have sucessfull message
        expect(res.body.message).toEqual('Welcome back Lucy test');
        // Expect res.body to contain token from JWT
        expect(res.body.token).toBeDefined();
    });

    test('It should return { message: "Email or passsword is incorrect, please try again!" } if password is incorrect', async () => {
        const res: request.Response = await request(app).post('/api/v1/login').send({
            usrEmail: 'danny.test@gmail.com',
            usrPassword: 'HelloDonny@12356',
        })  
        // Expect to get 422 status code
        .expect(422)
        .expect('Content-Type', 'application/json; charset=utf-8')
        console.log(`Response body from /api/v1/login/: ${res.body.message}`);
        // Expect to have Error message
        expect(res.body.message).toEqual('Email or passsword is incorrect, please try again!');
    });

    test('It should return { message: "Email or passsword is incorrect, please try again!" } if email is not in MongoDB', async () => {
        const res: request.Response = await request(app).post('/api/v1/login').send({
            usrEmail: 'johnny.test@gmail.com',
            usrPassword: 'HelloDanny@12356',
        })  
        // Expect to get 422 status code
        .expect(422)
        .expect('Content-Type', 'application/json; charset=utf-8')
        console.log(`Response body from /api/v1/login/: ${res.body.message}`);
        // Expect to have Error message
        expect(res.body.message).toEqual('Email or passsword is incorrect, please try again!');
    });

    test('It should return { Error: "Your email must be a valid email address" } if the email is not real', async () => {
        const res: request.Response = await request(app).post('/api/v1/login').send({
            usrEmail: 'helloThere@fdsee',
            usrPassword: 'HelloDanny@12356',
        })  
        // Expect to get 422 status code
        .expect(422)
        .expect('Content-Type', 'application/json; charset=utf-8')
        console.log('Response body from /api/v1/login/:', res.body.errors[0]);
        // Expect to have Error message
        expect(res.body.errors[0].msg).toEqual('Your email must be a valid email address');
    });

    
});