import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type:String, require: true},
    hashedPassword : {type:String, require:true}
})

const User = mongoose.model("User", userSchema, "Users");

export { User };