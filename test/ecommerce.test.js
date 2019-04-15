const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);

chai.should();

describe('Product routes', function() {
  describe('GET /products', function() {
    describe('SUCCESS', function() {
      it('should send an array with status code:200', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            console.log(res.status);
            res.should.have.status(200);
            res.body.should.be.an('array');
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
            res.body.should.not.be(null);
            res.body.message.should.be('data empty');
            done();
          })
      })
      it('should send an error message object with status code:500', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            // console.log(res);
            res.should.have.status(500);
            res.body.should.be.an('object');
            res.body.should.not.be(null);
            res.body.message.should.be('internal server error');
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
            res.body.should.have.property('token');
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
            res.body.message.should.be('email / password error');
          })
      })
      it('should send an error message object with status code:500', function(done) {
        let user = {
          email: 'user@mail.com',
          password: '12345'
        }
        chai
          .request(app)
          .post('/login')
          .send(user)
          .then(res => {
            res.should.have.status(500);
            res.body.message.should.be('internal server error');
          })
      })
    })
  })
})