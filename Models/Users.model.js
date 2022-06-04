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
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'course'
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'college'
  },

  departmentId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'department'
  },

  mobileNumber: {
    type: String,
  },

  roleId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'role'
  },

  userImg: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg"
  },
  notificationId: {
    type: String,
    default: " "
  },
  isNewUser: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  messagesList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
  likedPostsList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }]
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

UserSchema.pre('findOneAndUpdate', function (next) {
  console.log("inside pre middleware")
  let update = { ...this.getUpdate() };
  console.log(update)
  // Only run this function if password was modified
  if (update['$set']?.password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(update['$set'].password, salt, (err, hash) => {
        console.log(hash)
        update['$set'].password = hash;
        let saltSecret = salt;
        update['$set'].saltSecret = saltSecret;
        this.setUpdate(update);
        console.log(update)
        next();
      });
    });
  }
  else {
    next();
  }
});

// Methods
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
  return jwt.sign(
    { _id: this._id, fullName: this.fullName, email: this.email, UserImg: this.UserImg, newUser: this.isNewUser, collegeId: this.collegeId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP,
    }
  );
};

UserSchema.set('autoIndex', false);

module.exports = mongoose.model('user', UserSchema);
