const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);

chai.should();

describe('Product routes', function() {
  describe('GET /products', function() {
    describe('SUCCESS', function() {
      it('should send object with status code:200', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.products.should.be.an('array');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:404', function(done) {
        chai
          .request(app)
          .get('/products')
          .then(res => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.products.should.be(null);
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
  })

  describe('POST /products', function() {
    let product = {
      name: 'test',
      image: null,
      price: 1000,
      stock: 10,
    }
    describe('SUCCESS', function() {
      it('should send object with status code:201', function(done) {
        chai
          .request(app)
          .post('/products', product, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYmIxMWVlZWZhODY4NTVjMDI2NjNjZSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJNdWhhbW1hZCBSYW1hZGhvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTU1ODA1OTQ3fQ.BzmExBhlvFIXjuzccAuG_XlNMTUbsrkIW8Lz2ZAUomQ",
          })
          .then(res => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('newProduct');            
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:401', function(done) {
        chai
          .request(app)
          .post('/products', product)
          .then(res => {
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
  })

  describe('GET /products/:id', function() {
    describe('SUCCESS', function() {
      it('should send object with status code:200', function(done) {
        chai
          .request(app)
          .get('/products/5cbb305abd3f333ee52b4d00')
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.product.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:404', function(done) {
        let product = {
          name: 'test',
          image: null,
          price: 1000,
          stock: 10,
        };
        chai
          .request(app)
          .get('/products/5')
          .then(res => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
  })

  describe('PUT /products/:id', function() {
    let product = {
      name: 'test',
      image: null,
      price: 1000,
      stock: 10,
    }
    describe('SUCCESS', function() {
      it('should send object with status code:200', function(done) {
        chai
          .request(app)
          .put('/products/5cbc5c27f6046818aa85580f', product, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYmIxMWVlZWZhODY4NTVjMDI2NjNjZSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJNdWhhbW1hZCBSYW1hZGhvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTU1ODA1OTQ3fQ.BzmExBhlvFIXjuzccAuG_XlNMTUbsrkIW8Lz2ZAUomQ",
          })
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.updatedProduct.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:404', function(done) {
        chai
          .request(app)
          .put('/products/5', product, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYmIxMWVlZWZhODY4NTVjMDI2NjNjZSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJNdWhhbW1hZCBSYW1hZGhvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTU1ODA1OTQ3fQ.BzmExBhlvFIXjuzccAuG_XlNMTUbsrkIW8Lz2ZAUomQ",
          })
          .then(res => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:401', function(done) {
        chai
          .request(app)
          .put('/products/5cbc5c27f6046818aa85580f', product)
          .then(res => {
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
  })

  describe('PATCH /products/:id', function() {
    let product = {
      price: 1000,
      stock: 50,
    }
    describe('SUCCESS', function() {
      it('should send object with status code:200', function(done) {
        chai
          .request(app)
          .patch('/products/5cbc5c27f6046818aa85580f', product, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYmIxMWVlZWZhODY4NTVjMDI2NjNjZSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJNdWhhbW1hZCBSYW1hZGhvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTU1ODA1OTQ3fQ.BzmExBhlvFIXjuzccAuG_XlNMTUbsrkIW8Lz2ZAUomQ",
          })
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.updatedProduct.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:404', function(done) {
        chai
          .request(app)
          .patch('/products/5', product, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYmIxMWVlZWZhODY4NTVjMDI2NjNjZSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJNdWhhbW1hZCBSYW1hZGhvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTU1ODA1OTQ3fQ.BzmExBhlvFIXjuzccAuG_XlNMTUbsrkIW8Lz2ZAUomQ",
          })
          .then(res => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:401', function(done) {
        chai
          .request(app)
          .patch('/products/5cbc5c27f6046818aa85580f', product)
          .then(res => {
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
  })

  describe('DELETE /products/:id', function() {
    describe('SUCCESS', function() {
      it('should send object with status code:200', function(done) {
        chai
          .request(app)
          .delete('/products/5cbc5c27f6046818aa85580f', {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYmIxMWVlZWZhODY4NTVjMDI2NjNjZSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJNdWhhbW1hZCBSYW1hZGhvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTU1ODA1OTQ3fQ.BzmExBhlvFIXjuzccAuG_XlNMTUbsrkIW8Lz2ZAUomQ",
          })
          .then(res => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.deletedProduct.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:404', function(done) {
        chai
          .request(app)
          .delete('/products/5', {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYmIxMWVlZWZhODY4NTVjMDI2NjNjZSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiJNdWhhbW1hZCBSYW1hZGhvbmkiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTU1ODA1OTQ3fQ.BzmExBhlvFIXjuzccAuG_XlNMTUbsrkIW8Lz2ZAUomQ",
          })
          .then(res => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
            done();
          })
      })
    })
    describe('ERROR', function() {
      it('should send error object with status code:401', function(done) {
        chai
          .request(app)
          .delete('/products/5cbc5c27f6046818aa85580f')
          .then(res => {
            res.should.have.status(401);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          })
          .catch(err => {
            console.log('ERROR => ', err);
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