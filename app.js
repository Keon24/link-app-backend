import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js"
import linkRouter from "./routes/linkRoutes.js"
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());



const PORT = 5000

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection

db.on("error", (error) => {console.error(error)});
db.once("open",() => {console.log ("Connected to MongoDB")});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);

});
app.use("/user", userRouter);
app.use('/link', linkRouter);
