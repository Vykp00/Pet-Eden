import { describe, expect, test, afterAll } from '@jest/globals';
import { connectToServer } from '../db/services.db';
import DBManager from "../db/conn.db";
import request from 'supertest';
import app from '../app';
import redisClient from '../db/redis.db';

describe('Testing Authenticator methods for User', () => {
    afterAll(async () => {
        // Delete all test database with matched "test"
        await (await connectToServer('users')).deleteMany({ fullName: { $regex: "test" } });

        // Close MongoDB connection
        await DBManager.connection?.close();

        // Close Redis connection
        await redisClient.disconnect();
    });

    test('It send status code 401: Unauthorize when user is not log in', async () => {
        const res: request.Response = await request(app).get('/main').set('Origin', 'http://localhost:3000')
            // Expect to get 401: Aunthorization status
            .expect(401)
            .expect('Content-Type', 'application/json; charset=utf-8')
        //console.log(`Response body from /: ${res.body.message}`);
        // Expect to have Error message
        expect(res.body.message).toEqual("You're not logged in!");
    });
});