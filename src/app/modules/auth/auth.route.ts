import { Router } from "express"
import { AuthController } from "./auth.controller"
import { CheckAuth } from "../../middlewares/cheak.auth";
import { Role } from "../user/user.interface";

const router = Router()

router.post("/login", AuthController.credentialsLogin);

router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.post("/reset-password",CheckAuth(...Object.values(Role)), AuthController.reset_password);


export const AuthRouter = router