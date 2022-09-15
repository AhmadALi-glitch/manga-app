import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import filePath from "./file-path";
import {defaultRouter} from "./routes/default"

/// Environment Variables Setup
env.config({
    path: filePath.currentEnvironmentFilePath
})

/// Database Connection Setup
async function connectWithDatabase() { 
        const result = await mongoose.connect(process.env.DB_URI as string);
        return result;
}


/// Initializing The App
const app = express(); 

/// Using Middlewares


/// Using Routes
app.use("/", defaultRouter);

console.log(process.env.DB_URI);
/// Run The App ...
connectWithDatabase()
.then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT || 4000);
})
.catch((err) => {
    console.log(err);
})