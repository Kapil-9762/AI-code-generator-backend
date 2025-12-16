import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './src/connection/connectoin.js';
import auth from './routes/auth.js';
import generate from './routes/generatedCode.js';
const app = express();
dotenv.config();

// middlewares
app.use(cors()); 
app.use(express.json()); //to parse incomming json data (req.body)

app.use("/api/v1", auth);
app.use("/api/v2", generate);
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("hello");
}).listen(PORT, () => {
    console.log(`server is running on the port: ${PORT}`);
})