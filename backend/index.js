import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import logs from "./routers/logs.js";
const app = express();
dotenv.config()
app.use(express.json());
app.use(cors())
app.use(logs)

app.listen(process.env.PORT || 5000, () => console.log("Listening"));
