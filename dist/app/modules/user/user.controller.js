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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControlllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = require("./user.service");
const catchasync_1 = require("../../util/catchasync");
const sendresponse_1 = require("../../util/sendresponse");
const createUserFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userServices.createUser(req.body);
    res.status(http_status_codes_1.default.CREATED).json({
        message: "User createwd sussesful",
        user
    });
});
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // throw new Error( "fake error")
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error")
//         createUserFunction(req, res)
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//         // eslint-disable-next-line no-console
//         console.log(error);
//         next(error)
//     }
// }
const createUser = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userServices.createUser(req.body);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        message: "User created successfully",
        success: true,
        data: user,
    });
}));
const upadteUser = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifytoken(token as string, envVars.JWT_ACCESS_TOKNE) as JwtPayload;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = yield user_service_1.userServices.updateUser(userId, payload, verifiedToken);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        message: "User updated successfully",
        success: true,
        data: user,
    });
}));
const getAllUser = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUser();
    // res.status(201).json({
    //     success: true,
    //     message: "All user Recive succesfully",
    //     data: user
    // })
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        message: "all user retrive  successfully",
        success: true,
        data: result.data,
        meta: result.meta
    });
}));
exports.UserControlllers = {
    createUser, getAllUser, upadteUser
};
