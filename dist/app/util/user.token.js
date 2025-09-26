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
exports.createNewAccessTokenWithrefreshtoken = exports.createUserToken = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../config/env");
const user_interface_1 = require("../modules/user/user.interface");
const jwt_1 = require("./jwt");
const AppError_1 = __importDefault(require("../errorhelpers/AppError"));
const user_model_1 = require("../modules/user/user.model");
const createUserToken = (user) => {
    const JwtPayload = {
        role: user.role,
        userId: user._id,
        email: user.email,
    };
    const accesstoken = (0, jwt_1.genaratetoken)(JwtPayload, env_1.envVars.JWT_ACCESS_TOKNE, env_1.envVars.JWT_ACCESS_EXPIRES);
    const refreshToken = (0, jwt_1.genaratetoken)(JwtPayload, env_1.envVars.JWT_REFRESH_SECRECT, env_1.envVars.JWT_REFRESH_EXPIRES);
    return {
        accesstoken, refreshToken,
    };
};
exports.createUserToken = createUserToken;
const createNewAccessTokenWithrefreshtoken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefresfToken = (0, jwt_1.verifytoken)(refreshToken, env_1.envVars.JWT_REFRESH_SECRECT);
    const IsUserExit = yield user_model_1.User.findOne({ email: verifiedRefresfToken.email });
    if (!IsUserExit) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User not found");
    }
    if (IsUserExit.isActive === user_interface_1.IsActive.BLOCKED || IsUserExit.isActive === user_interface_1.IsActive.INACTIVE) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User not found ${user_interface_1.IsActive}`);
    }
    if (IsUserExit.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User not found ${IsUserExit}`);
    }
    const JwtPayload = {
        role: IsUserExit.role,
        email: IsUserExit.email,
        userId: IsUserExit._id
    };
    const accesstoken = (0, jwt_1.genaratetoken)(JwtPayload, env_1.envVars.JWT_ACCESS_TOKNE, env_1.envVars.JWT_ACCESS_EXPIRES);
    return accesstoken;
});
exports.createNewAccessTokenWithrefreshtoken = createNewAccessTokenWithrefreshtoken;
