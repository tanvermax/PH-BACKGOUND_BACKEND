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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchasync_1 = require("../../util/catchasync");
const sendresponse_1 = require("../../util/sendresponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = require("./auth.service");
const AppError_1 = __importDefault(require("../../errorhelpers/AppError"));
const setCookies_1 = require("../../util/setCookies");
const user_token_1 = require("../../util/user.token");
const env_1 = require("../../config/env");
const passport_1 = __importDefault(require("passport"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport_1.default.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(new AppError_1.default(401, err.message));
        }
        if (!user) {
            return next(new AppError_1.default(401, info === null || info === void 0 ? void 0 : info.message));
        }
        const userToken = yield (0, user_token_1.createUserToken)(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = user.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
        (0, setCookies_1.setAuthCookie)(res, userToken);
        (0, sendresponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            message: "User Log in  successfully",
            success: true,
            data: {
                accessToken: userToken.accesstoken,
                refreshToken: userToken.refreshToken,
                user: rest
            }
        });
    }))(req, res, next);
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshtoken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!refreshtoken) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No refresh token recieved from cookies.");
    }
    const tokeninfo = yield auth_service_1.AuthService.getNewAccessToken(refreshtoken);
    //  setAuthCookie(res, tokeninfo);
    res.cookie("accessToken", tokeninfo.accesstoken, {
        httpOnly: true,
        secure: false
    });
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "User Log in  successfully",
        success: true,
        data: tokeninfo,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "User Logout  successfully",
        success: true,
        data: null,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reset_password = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    yield auth_service_1.AuthService.resetPassword(oldPassword, newPassword, decodedToken);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "password changed  successfully",
        success: true,
        data: null,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const googlCallbackConmtroll = (0, catchasync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let redirectTo = req.query.state ? req.query.state : " ";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found");
    }
    const tokenInfo = (0, user_token_1.createUserToken)(user);
    (0, setCookies_1.setAuthCookie)(res, tokenInfo);
    res.redirect(`${env_1.envVars.FRONT_END_URL}/${redirectTo}`);
    (0, sendresponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        message: "password changed  successfully",
        success: true,
        data: null,
    });
}));
exports.AuthController = {
    credentialsLogin, getNewAccessToken, logout, reset_password, googlCallbackConmtroll
};
