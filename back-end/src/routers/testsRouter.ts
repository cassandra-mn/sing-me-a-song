import express from "express";
import {resetDatabase} from "../controllers/testsController.js";

const testsRouter = express.Router();

testsRouter.post("/database/reset", resetDatabase);

export default testsRouter;