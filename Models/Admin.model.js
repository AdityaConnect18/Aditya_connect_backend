const mongoose = require('mongoose');

var adminSchema = mongoose.Schema({

    adminName: {
        type: String
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

    empId: {
        type: String
    },

    mobileNumber: {
        type: String
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'course'
    },
    DeptId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'department'
    },

    // ToDo create column for Admin posted posts

    channelList: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'course'
        }
    ]
});

adminSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
adminSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods
adminSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

adminSchema.methods.generateJwt = function () {
    return jwt.sign(
        { _id: this._id, fullName: this.fullName, email: this.email, UserImg: this.UserImg },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP,
        }
    );
};

adminSchema.set('autoIndex', false);

module.exports = mongoose.model('admin', adminSchema);