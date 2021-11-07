'use strict'

const {app}=require('../app');
const supertest=require('supertest');
const mockRequest=supertest(app);
const {db}=require('../auth/models/index');



beforeAll(async()=>{
    await db.sync();
})

afterAll(async()=>{
    await db.drop();
})

describe('API server', () => {
    it('POST to /signup to create a new user', async () => {
      const data = { username: 'test', password: '123' };
      const response = await mockRequest.post('/signup').send(data);
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(data.username);
    });
  
    it('POST to /signin to login as a user', async () => {
      const data = { username: 'test', password: '123' };
      const response2 = await mockRequest.post('/signin').set({ 'Authorization': `Basic dGVzdDoxMjM=` });
      expect(response2.status).toEqual(200);
      expect(response2.name).toEqual(data.name);
    });
  });
  
  describe('Middleware and routes tests', ()=>{
    it('Send error when authorization headers are bad', async ()=>{
      const res = await mockRequest.post('/signin').set({ 'Authorization': `Bearer dGVzdDoxMjM=` });
      expect(res.status).toEqual(500);
      expect(res.text).toEqual('Wrong Authorization header');
    });
  
    it('Send error when username is wrong', async ()=>{
      const res = await mockRequest.post('/signin').set({ 'Authorization': `Basic dGVzvDoxMjM=` });
      expect(res.status).toEqual(500);
      expect(res.text).toEqual('Invalid Username/Password');
    });
  
    it('Send error when password is wrong', async ()=>{
      const res = await mockRequest.post('/signin').set({ 'Authorization': `Basic dGVzdDoxMlM=` });
      expect(res.status).toEqual(500);
      expect(res.text).toEqual('Invalid Username/Password');
    });
  });