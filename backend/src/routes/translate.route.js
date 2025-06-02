import express from "express";
import { translateTo } from "../controllers/translate.controller.js";

const router = express.Router();

router.post("/", translateTo);

export default router;
