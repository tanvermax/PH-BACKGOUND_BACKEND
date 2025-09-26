"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourRoute = void 0;
const express_1 = require("express");
const cheak_auth_1 = require("../../middlewares/cheak.auth");
const user_interface_1 = require("../user/user.interface");
const tour_controller_1 = require("./tour.controller");
const router = (0, express_1.Router)();
router.post("/create-tour-type", (0, cheak_auth_1.CheckAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.TourController.creatTour);
router.get("/", tour_controller_1.TourController.getAlltours);
router.patch('/tour-types/:id', (0, cheak_auth_1.CheckAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), tour_controller_1.TourController.updateTours);
// router.delete('/:id' , DivisionController.deleteDivisons)
exports.TourRoute = router;
