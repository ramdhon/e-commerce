const mongoose = require('mongoose');
const bcrypt = require('../helpers/bcrypt');

let { Schema } = mongoose;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'required']
  },
  role: {
    type: String,
    required: [true, 'required']
  },
  email: {
    type: String,
    validate: [{
      validator: function(val) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
      },
      message: props => 'not valid'
    },
    {
      validator: async function(val) {
        let user = await User.findOne({
          email: val
        })
        if (user) return false;
      },
      message: props => `not a unique one`
    }
    // {
    //   validator: function(val) {
    //     return User.findOne({
    //       email: val
    //     })
    //       .then( user => {
    //         console.log(user);
    //         if (user) return false;
    //       })
    //       .catch(err => {
    //         throw err;
    //       })
    //   },
    //   message: props => 'not unique'
    // }
    ]
  },
  password: String,
})

userSchema.pre('save', function(next) {
  this.password = bcrypt.hash(this.password);
  next();
})

// userSchema.path('email').validate(function(val) {
//   return User.findOne({
//     email: val
//   })
//     .then( user => {
//       if (user) return false;
//     })
    
// }, 'not unique')

let User = mongoose.model('User', userSchema);


module.exports = User;