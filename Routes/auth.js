import express from "express"
import { googleAuth, signup, singin } from "../Controllers/auth.js";
const router = express.Router();

//CREATE USER 
router.post("/singup", signup)

//SINGIN USER
router.post("/singin", singin)

//SET COOKIE
// router.get("/setcookie", setCookies)

//GOOGLE AUTH
router.post("/google", googleAuth)



export default router