  
require('dotenv').config();
const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('router', function() {
    describe('environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.NODE_ENV).toBe('testing');
        });
    });

    describe('GET /api/jokes', function() {
        it('authorizes only correct users', function () {
            const token = "abcdefgh";
            return request(server).get('/api/jokes').set('authorization', 'token').then(res => {
                expect(res.status).toBe(401);
            });
        });

        it('returns a json object', function() {
            return request(server).get('/api/jokes').then(res => {
                expect(res.type).toMatch(/json/i);
            });
        });
    });
});