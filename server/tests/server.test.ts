import { describe, expect, jest, test} from '@jest/globals';
import request from 'supertest';
import app from '../app';

describe('Server is loaded at PORT', () => {
    test('It should get status code 200 from GET method', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toBe(200)
    });
})
