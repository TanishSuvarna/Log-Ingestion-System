import { Router } from "express";
import { logsInsert } from "../controllers/logs.js";
const logsRouter = Router();

logsRouter.post("/logs" , logsInsert);

export default logsRouter;