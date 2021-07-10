require('dotenv').config();
const request = require("supertest");
const server = require("../api/server.js");
const db = require('../database/dbConfig.js');

describe('router', function() {
    describe('environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.NODE_ENV).toBe('testing');
        });
    });

    describe('POST /api/register', function() {
        beforeEach(async function() {
            await db('users').truncate();
        });

        it('should add the new user', function() {
            const payload = { username: "admin3", password: "password3" };
            return request(server).post('/api/auth/register').send(payload).then(res => {
                expect(res.body.user.username).toBe('admin3');
            });
        });

        it('should return a status code 201', function() {
            const payload = { username: "admin3", password: "password3" };
            return request(server).post('/api/auth/register').send(payload).then(res => {
                expect(res.status).toBe(201);
            });
        });
    });

    describe('POST /api/login', function() {
        it('should log in the user', function() {
            const payload = { username: "admin3", password: "password3" };
            return request(server).post('/api/auth/login').send(payload).then(res => {
                expect(res.status).toBe(200);
            });
        });

        it('should contain a token', function() {
            const payload = { username: "admin3", password: "password3" };
            return request(server).post('/api/auth/login').send(payload).then(res => {
                expect(res.text).toContain("token");
            });
        });
    });
});