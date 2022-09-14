import express from "express";

const defaultRouter = express.Router();

defaultRouter.get('/', async (req, res) =>{
    res.send("default page");
})

export {defaultRouter};