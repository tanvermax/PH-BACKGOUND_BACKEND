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
exports.CheckAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../errorhelpers/AppError"));
const jwt_1 = require("../util/jwt");
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const user_interface_1 = require("../modules/user/user.interface");
const CheckAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accesToken = req.headers.authorization;
        if (!accesToken) {
            throw new AppError_1.default(403, "No Token recived");
        }
        const verifiedToken = (0, jwt_1.verifytoken)(accesToken, env_1.envVars.JWT_ACCESS_TOKNE);
        const IsUserExit = yield user_model_1.User.findOne({ email: verifiedToken.email });
        if (!IsUserExit) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User not found");
        }
        if (IsUserExit.isActive === user_interface_1.IsActive.BLOCKED || IsUserExit.isActive === user_interface_1.IsActive.INACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User not found ${user_interface_1.IsActive}`);
        }
        if (IsUserExit.isDeleted) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User not found ${IsUserExit}`);
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(403, "you are not permited to access");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.CheckAuth = CheckAuth;
