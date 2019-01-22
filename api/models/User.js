/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    'firstname': {
      type: 'string',
      required: true
    },
    'lastname': {
      type: 'string'
    },
    'email': {
      type: 'string',
      isEmail : true,
      unique: true,
      required: true
    },
    'encryptedPassword': {
      type: 'string'
    },
  },

  customToJSON: function() {
    var obj = this;
    delete obj.encryptedPassword;
    return obj;
  },

  beforeCreate: function(values, cb) {
    if(!values.password || !values.confirmation || values.password != values.confirmation) {
      return cb({err: ["Password does not match confirmation"]});
    }
    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if (err) return cb(err);
      values.encryptedPassword = hash;

      //Delete the passwords so that they are not stored in the DB
      delete values.password;
      delete values.confirmation;

      cb();
    });
  },



};
