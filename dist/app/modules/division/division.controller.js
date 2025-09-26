"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.DivisionController = void 0;
const catchasync_1 = require("../../util/catchasync");
const divison_service_1 = require("./divison.service");
const sendresponse_1 = require("../../util/sendresponse");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createDivision = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body in controller:", req.body);
    const division = yield divison_service_1.divisionService.createDivisions(req.body);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "division created successfully",
        success: true,
        data: division,
    });
}));
const getAllDivison = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    console.log("query from controller", query);
    const result = yield divison_service_1.divisionService.getAllDivisions(query);
    // res.status(201).json({
    //     success: true,
    //     message: "All user Recive succesfully",
    //     data: user
    // })
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "all user retrive  successfully",
        success: true,
        data: result.data,
        meta: result.meta
    });
}));
const updateDivisions = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const divisonId = req.params.id;
    const divison = yield divison_service_1.divisionService.updatedivisions(divisonId, req.body);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "User updated successfully",
        success: true,
        data: divison,
    });
}));
const deleteDivisons = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const divison = yield divison_service_1.divisionService.deleteDivision(req.params.id);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "divison delete successfully",
        success: true,
        data: divison,
    });
}));
exports.DivisionController = {
    createDivision, getAllDivison, updateDivisions, deleteDivisons
};
