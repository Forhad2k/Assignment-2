import express from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";



const router = express.Router();


router.get("/", auth("admin"),  userController.getUser)
 
router.put("/:userId", auth(), userController.updateUser)

router.delete("/:userId", auth(), userController.deleteUser)

export const UserRouter = router;