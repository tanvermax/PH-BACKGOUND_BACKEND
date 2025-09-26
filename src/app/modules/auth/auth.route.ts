import { NextFunction, Request, Response, Router } from "express"
import { AuthController } from "./auth.controller"
import { CheckAuth } from "../../middlewares/cheak.auth";
import { Role } from "../user/user.interface";
import passport from "passport";

const router = Router()

router.post("/login", AuthController.credentialsLogin);

router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.post("/reset-password", CheckAuth(...Object.values(Role)), AuthController.reset_password);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res,next)
    
});


router.get("google/callback", passport.authenticate(
    "google", { failureRedirect: "/login" }), AuthController.googlCallbackConmtroll)

export const AuthRouter = router