import express from "express";
import user from "../controllers/user.js"
import agent from "../controllers/agent.js"
const router=express.Router();

router.use("/user",user)
router.use("/agent",agent)


export default router