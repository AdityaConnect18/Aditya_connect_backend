const mongoose = require('mongoose');

var adminSchema = mongoose.Schema({

    adminName : {
        type:String
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

      empId : {
          type: String
      },

      mobileNumber : {
          type: String
      },

      DegreeId :{
          type: String
      },
       DeptId :{
           type: String
       },
       channelList : [
           {
               type: String
           }
       ]
});