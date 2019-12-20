const request  = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');
const {add} = require('../auth/auth-model');


it('should set db environment to testing', function() {
  expect(process.env.DB_ENV).toBe('testing');
})

describe('server', function(){
  describe('GET /', function(){
    it(`should return 'server is up and running `, function(){
      return request(server)
      .get('/')
      .then(res => {
        expect(res.status).toBe(200);
      })
    })
  })
})

describe('server', function(){
  describe('GET /', function(){
      it('should return all users', function(){
          return request(server)
          .get('/')
          .then(res=>{expect(res.status).toBe(200)})
      })
  })
})

describe('server', function(){
  describe('GET /', function(){
    it('should return a status of 400 cannot pass', function(){
      return request(server)
      .get('/api/jokes')
      .then(res => {expect(res.status).toBe(400)})
    })
  })
})

describe('server', function(){
  describe('GET /', function(){
    it('should return a json format', function(){
      return request(server)
      .get('/api/jokes')
      .then(res => {expect(res.type).toMatch(/json/i)})
    })
  })
})




describe('server', function(){
  describe('POST /', function(){
    it(`should return text formatted response `, function(){
      return request(server)
      .post('/api/auth/register')
      .then(res => {
        expect(res.type).toMatch(/text/i);
      })
    })
  })
})


describe('server', function(){
  describe('POST /api/auth/register', function(){
    it('should return a body with empty bracket', function(){
      return request(server)
      .post('/api/auth/register')
      .then(res => {
        expect(res.body).toEqual({})
      })
    })
  })
})




describe('add user', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it('inserts a user into the db', async () => {
    let user;
    user = await db('users');
    await add({
      username: "Jordan",
      password: "1234"
     })
    user = await db('users');
    expect(user).toHaveLength(1);
  })
})
describe('server', function(){
  describe('POST /login', function() {
    it('should get a list of user', function() {
        return request(server)
    .post('/api/auth/login')
    .send({username:'Jordan', password:'1234'})
    .then(res => {
      expect(res.status).toBe(401);
        });
    })
    it("should return JSON formatted response", function() {
        return request(server)
            .post("/api/auth/login")
            .then(res => {
            expect(res.type).toMatch(/json/i);
            });
        })
    })
})