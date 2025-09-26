import { CreateDivisionZOdSchema, UpdateDivisonSchema } from './division.validion';
import { Router } from "express";
import { DivisionController } from "./division.controller";
import { CheckAuth } from '../../middlewares/cheak.auth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validationRequest';

const router = Router()



router.post("/create",CheckAuth(Role.ADMIN,Role.SUPER_ADMIN),validateRequest(CreateDivisionZOdSchema),DivisionController.createDivision)
router.get("/",DivisionController.getAllDivison);
router.patch('/:id', CheckAuth(Role.ADMIN,Role.SUPER_ADMIN),validateRequest(UpdateDivisonSchema), DivisionController.updateDivisions)
router.delete('/:id' , DivisionController.deleteDivisons)



export const DivisionRoute = router