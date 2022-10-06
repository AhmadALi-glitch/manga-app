import joi from "joi";

export default class ValidationSchema{

    static get userSchema() {
        return joi.object({
            username : joi.string().required().min(1).max(30),
            password : joi.string().required().min(4).max(30)
        })
    }

}
