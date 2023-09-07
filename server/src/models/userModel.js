const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
         type: String, 
         required: true 
    },
    surname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
)
module.exports = mongoose.model("Users", userSchema)
