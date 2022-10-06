import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username : {type:String, require: true},
    password : {type:String, require:true}
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {
            _id : this.id,
            username : this.username
        },
    String(process.env.JWT_SECRET));
    return token;
}

userSchema.methods.hashPassword = function(password:string) {
    try {
        const hashResult = bcrypt.hashSync(password, 13);
        return hashResult;
    }
    catch (error:any) {
        return error;
    }
}

userSchema.methods.compareHashedPassword = function(password1:string, password2:string) {
    return bcrypt.compareSync(password1, password2);
}

const User = mongoose.model("User", userSchema, "Users");

export { User };