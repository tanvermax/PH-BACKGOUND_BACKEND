import { Router } from "express";
import { UserControlllers } from "./user.controller";
import { createUserZodSchema } from "./users.validation";
import { validateRequest } from "../../middlewares/validationRequest";
import { Role } from "./user.interface";

import { CheckAuth } from "../../middlewares/cheak.auth";
const router = Router()




router.post("/register", validateRequest(createUserZodSchema), UserControlllers.createUser)
router.get("/alluser", CheckAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControlllers.getAllUser)
router.patch('/:id', CheckAuth(...Object.values(Role)), UserControlllers.upadteUser)


export const UserRoutes = router