import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../Controllers/User.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();
//UPDATE USER
router.put("/:id", verifyToken, update)

//DELETE USER
router.delete("/:id", verifyToken, deleteUser)

//GET A USER
router.get("/find/:id", getUser)

//SUBSCRIBE A USER
router.put("/sub/:id", verifyToken, subscribe)

// UNSUBSCIBE A USER
router.put("/unsub/:id", verifyToken, unsubscribe)

// LIKE A VIDEO
router.put("/like/:videoId", verifyToken, like)

// DISLIKE A VIDEO
router.put("/dislike/:videoId", verifyToken, dislike)
export default router