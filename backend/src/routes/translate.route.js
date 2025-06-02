import express from "express";
import { translateTo } from "../controllers/translate.controller.js";

const router = express.Router();

router.post("/:to", translateTo);

export default router;
