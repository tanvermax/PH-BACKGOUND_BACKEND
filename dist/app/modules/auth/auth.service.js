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
exports.AuthService = void 0;
const AppError_1 = __importDefault(require("../../errorhelpers/AppError"));
// import { IUser } from "../user/user.interface"
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_token_1 = require("../../util/user.token");
const env_1 = require("../../config/env");
// const credentialsLogin = async (paylod: Partial<IUser>) => {
//     const { email, password } = paylod;
//     const IsUserExit = await User.findOne({ email });
//     if (!IsUserExit) {
//         throw new AppError(httpStatus.BAD_REQUEST,
//             "User not found")
//     }
//     const isPasswordMatch = await bcryptjs.compare(password as string,
//         IsUserExit.password as string)
//     if (!isPasswordMatch) {
//         throw new AppError(httpStatus.BAD_REQUEST,
//             "Incorrect password")
//     }
//     const userToken = createUserToken(IsUserExit)
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password: pass, ...rest } = IsUserExit.toObject()
//     return {
//         accesstoken: userToken.accesstoken,
//         refreshToken: userToken.refreshToken,
//         user: rest
//     }
// }
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const newAccessToken = yield (0, user_token_1.createNewAccessTokenWithrefreshtoken)(refreshToken);
    return {
        accesstoken: newAccessToken
    };
});
const resetPassword = (oldPassword, newPassword, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(decodedToken.userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User not found");
    }
    const isOldPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "password does not match");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    yield user.save();
    return true;
});
exports.AuthService = {
    getNewAccessToken, resetPassword
};
