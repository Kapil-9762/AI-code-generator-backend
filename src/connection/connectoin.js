import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then((res) => {
            console.log("mongoDB connected");
        })
    } catch (error) {
        console.log(error.message);
    }
}
connectionDB();