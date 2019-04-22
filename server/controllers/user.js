const User = require('../models/user');
const bcrypt = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');
const gverify = require('../helpers/gverify');

class Controller {
  static login(req, res) {
    User.findOne({
      email: req.body.email,
    })
      .then(foundUser => {
        if(!foundUser) {
          res.status(404).json({ message: 'email incorrect' })
        } else {
          let valid = bcrypt.compare(req.body.password, foundUser.password);
          if (!valid) {
            res.status(400).json({ message: 'password incorrect' });
          } else {
            let token = jwt.sign({
              id: foundUser._id,
              role: foundUser.role,
              name: foundUser.name,
              email: foundUser.email
            })
            res.status(200).json({ message: 'login success', token: token });
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static register(req, res) {
    let defaultName = req.body.email;
    User.create({
      name: req.body.name || defaultName.slice(0, defaultName.indexOf('@')),
      role: req.body.role === 'admin' && 'admin' || 'customer',
      email: req.body.email,
      password: req.body.password
    })
      .then(newUser => {
        res.status(201).json({ message: 'account registered', newUser });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
      })
  }

  static glogin(req, res) {
    let getPayload = null;
    gverify(req.body.token)
      .then(ticket => {
        const payload = ticket.getPayload();
        getPayload = payload;
        // console.log('PAYLOAD ==> ', payload);
        // res.status(200).json(payload);
        return User.findOne({
          email: payload.email
        })
      })
      .then(user => {
        // console.log('FOUND USER >>> ', user)
        if(!user) {
          return User.create({
            name: getPayload.name,
            role: 'customer',
            email: getPayload.email,
            password: '',
          })
        } else {
          return user;
        }
      })
      .then(user => {
        // console.log('USER >>> ', user);
        let token = jwt.sign({
          id: user._id,
          role: user.role,
          name: user.name,
          email: user.email
        }, process.env.SECRET_JWT)
        // console.log('TOKEN >>> ', token);
        res.status(200).json({ message: 'login success', token });
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'internal server error', err });
      })
  }

}


module.exports = Controller;