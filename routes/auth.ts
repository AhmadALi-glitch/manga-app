import express from "express";
import joi from "joi";
import ValidationSchema from "../utils/validationSchema";
import { User } from "../models/User";
import _ from "lodash";
import bcrypt from "bcryptjs";

const authRouter = express.Router();

authRouter.post('/auth/register', async (req, res) =>{
    
    // Validate User Criedntials...
    const validationResult = ValidationSchema.userSchema.validate(req.body);
    if(validationResult.error) {
        res.status(404).send({error : validationResult.error.message});
        return;
    }

    // Create user Object
    const user = new User(_.pick(req.body, ['username']));

    // Hash The password
    const result = bcrypt.hashSync(req.body.password, 13);
    user.hashedPassword = result;

    // Save the user in the database
    user.save()
    .then((result:any) => {
        res.send(result);
    })
    .catch((error:any) => {
        res.send(error)
    })

    
})

authRouter.post('/auth/login', async (req, res) =>{
    
    // Validate User Criedntials...
    const validationResult = ValidationSchema.userSchema.validate(req.body);
    if(validationResult.error) {
        res.status(404).send({error : validationResult.error.message});
        return;
    }

    // Create user Object
    const user = new User(_.pick(req.body, ['username']));

    // Check the user...
    User.find({username : user.username})
        .then((userResult:any) => {

            bcrypt.compare(req.body.password, userResult[0].hashedPassword)
                .catch((hashError:boolean) => {
                    res.send(hashError);
                })

            return userResult;
        })
        .then((userResult) => {
            res.send(userResult);
        })
        .catch((userCheckError) => {
            res.send("user not found");
        })

})

export {authRouter};
