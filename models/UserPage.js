const mongoose = require("mongoose");

const UserPageSchema = new mongoose.Schema(
    {
        id : {type: Number}, 
        first_name : {type : String  }, 
        last_name : {type : String },
        email: {type : String},
        gender : {type : String  },
        avatar: {type : String },
        domain : {type : String  },
        available : {type: Boolean , default: true}
        

    }, { timestamps : true }
)

module.exports = mongoose.model("UserPage" , UserPageSchema);