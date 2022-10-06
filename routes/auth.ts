import express from "express";
import ValidationSchema from "../utils/validationSchema";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import _, { concat } from "lodash";
import { MongooseError } from "mongoose";

const authRouter = express.Router();

authRouter.post('/auth/register', async (req, res) =>{
    
    // Validate User Criedntials...
    const validationResult = ValidationSchema.userSchema.validate(req.body);
    if(validationResult.error) {
        res.status(404).send({validationError : validationResult.error.message});
        return;
    }

    // Create user Object
    const user = new User(_.pick(req.body, ['username', 'password']));

    // Hash The password
    user.password = 
    user.schema.methods.hashPassword(req.body.password);

    // Save the user in the database
    user.save()
        .then((userSaveResult:any) => {
            const token = user.schema.methods.generateAuthToken();
            res.header('x-auth', token).send(_.pick(userSaveResult, ['username', '_id', "password"]));
        })
        .catch((userSaveError:any) => {
            res.send(userSaveError);
        })
})


authRouter.post('/auth/login', async (req, res) =>{
    
    // Validate User Criedntials...
    const validationResult = ValidationSchema.userSchema.validate(req.body);
    if(validationResult.error) {
        res.status(404).send({validationError : validationResult.error.message});
        return;
    }

    // Create user Object
    const user = new User(_.pick(req.body, ['username']));

    // Check the user...
    User.findOne( {username : req.body.username} )
        .then((userResult:any) => {
            const compareResult = user.schema.methods
            .compareHashedPassword(req.body.password, userResult.password);
        if(!compareResult) {
            res.send("wrong password");
            return;
        }
        else {
            res.send(userResult);
        }
        })
        .catch((userCheckError:MongooseError) => {
            res.send("User Not Found");
        })

})

export {authRouter};
