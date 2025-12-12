import Express  from "express";
import { authController } from "./auth.controller";


const router = Express.Router();

router.post("/signup", authController.createUser);
router.post("/signin", authController.loginUser);




export const authRouter = router;