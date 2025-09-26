import { Router } from "express"
import { CheckAuth } from "../../middlewares/cheak.auth"
import { Role } from "../user/user.interface"
import { TourController } from "./tour.controller"

const router = Router()



router.post("/create-tour-type",
    CheckAuth(Role.ADMIN,Role.SUPER_ADMIN),
    TourController.creatTour
)

router.get("/",TourController.getAlltours)

router.patch('/tour-types/:id', CheckAuth(Role.ADMIN,Role.SUPER_ADMIN), TourController.updateTours)
// router.delete('/:id' , DivisionController.deleteDivisons)

export const TourRoute = router
