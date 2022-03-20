const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "Full name can't be empty",
  },
  email: {
    type: String,
    required: "Email can't be empty",
    unique: true,
  },
  password: {
    type: String,
    required: "Password can't be empty",
    minlength: [4, 'Password must be atleast 4 character long'],
  },
  saltSecret: String,

  rollNumber: {
    type: String,
    required: "Roll number can't be empty",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'course'
  },

  CollegeId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'college'
  },

  DepartmentId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'department'
  },

  mobileNumber: {
    type: String,
  },

  roleId: {
    type: String,
  },

  UserImg: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg"
  },
});



UserSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
UserSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
  return jwt.sign(
    { _id: this._id, fullName: this.fullName, email: this.email, UserImg: this.UserImg },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP,
    }
  );
};

UserSchema.set('autoIndex', false);

module.exports = mongoose.model('user', UserSchema);
