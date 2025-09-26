"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourController = void 0;
const catchasync_1 = require("../../util/catchasync");
const sendresponse_1 = require("../../util/sendresponse");
const tour_service_1 = require("./tour.service");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const creatTour = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body in controller:", req.body);
    const division = yield tour_service_1.tourService.createTour(req.body);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Tour created successfully",
        success: true,
        data: division,
    });
}));
const getAlltours = (0, catchasync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    console.log(query);
    const result = yield tour_service_1.tourService.getAllTour(query);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "all tour Service  successfully",
        success: true,
        data: result.data,
        meta: result.meta
    });
}));
const updateTours = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tourId = req.params.id;
    const divison = yield tour_service_1.tourService.updateTour(tourId, req.body);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "TOur updated successfully",
        success: true,
        data: divison,
    });
}));
exports.TourController = {
    creatTour, getAlltours, updateTours
};
