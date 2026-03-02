import express from "express"
const route = express.Router();
import { identify } from "./controller.js";

route.post("/identify", identify)
export default route;