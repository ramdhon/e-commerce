const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);

chai.should();

describe('Product routes', function() {
  describe('GET /products', function() {
    describe('SUCCESS', function() {
      it('should send a data array in object with status code:200', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            // console.log(res.status);
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.data.should.be('array');
            res.body.should.have.property('message');
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send an error message object with status code:404', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            // console.log(res);
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.data.should.be(null);
            res.body.should.have.property('message');
            done();
          })
      })
    })
  })
})

describe('User routes', function() {
  describe('POST /login', function() {
    describe('SUCCESS', function() {
      it('should send a token object with status code:200', function(done) {
        let user = {
          email: 'user@mail.com',
          password: '12345'
        }
        chai
          .request(app)
          .post('/login')
          .send(user)
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            res.body.should.have.property('message');
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send an error message object with status code:401', function(done) {
        let user = {
          email: 'user@mail.com',
          password: '12345'
        }
        chai
          .request(app)
          .post('/login')
          .send(user)
          .then(res => {
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.not.have.property('token');
            res.body.should.have.property('message');
            done();
          })
      })
    })
  })

  describe('POST /register', function() {
    describe('SUCCESS', function() {
      it('should send an object with status code:201', function(done) {
        let newUser = {
          name: 'Full Name',
          email: 'user@mail.com',
          password: '12345'
        }
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .then(res => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('newUser');
            res.body.should.have.property('message');
            res.body.newUser.password.should.not.be(newUser.password);
          })
      })
    })
    describe('ERROR', function() {
      it('should be password not hashed with status code:201', function(done) {
        let newUser = {
          name: 'Full Name',
          email: 'user@mail.com',
          password: '12345'
        }
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .then(res => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('newUser');
            res.body.should.have.property('message');
            res.body.newUser.password.should.be(newUser.password);
          })
      })
    })
  })
})

describe('Cart routes', function() {
  describe('GET /carts', function() {
    describe('SUCCESS', function() {
      it('should send a data array in object with status code:200', function(done) {
        chai
          .request(app)
          .get('/user/carts')
          .set()
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.data.should.be('array');
            res.body.should.have.property('message');
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send an error message object with status code:401', function(done) {
        chai
          .request(app)
          .get('/user/carts')
          .set('')
          .then(res => {
            // console.log(res);
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.data.should.be(null);
            res.body.should.have.property('message');
            done();
          })
      })
      it('should send an error message object with status code:404', function(done) {
        chai
          .request(app)
          .get('/user/carts')
          .then(res => {
            // console.log(res);
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.data.should.be(null);
            res.body.should.have.property('message');
            done();
          })
      })
    })
  })
})