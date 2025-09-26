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
// import  httpStatus from 'http-status-codes';
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("./env");
const user_model_1 = require("../modules/user/user.model");
const user_interface_1 = require("../modules/user/user.interface");
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import AppError from "./AppError";
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password"
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IsUserExit = yield user_model_1.User.findOne({ email });
        if (!IsUserExit) {
            return done(null, false, { message: "User not found" });
        }
        // Check if user registered with Google but doesn't have password
        const googleAuthenticated = IsUserExit.auths.some(providerObject => providerObject.provider === "google");
        if (googleAuthenticated && !IsUserExit.password) {
            return done(null, false, {
                message: "You authenticated with Google. To login with email/password, please set a password for your account."
            });
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, IsUserExit.password);
        if (!isPasswordMatch) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, IsUserExit);
    }
    catch (error) {
        console.log(error);
        return done(error);
    }
})));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVars.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.envVars.GOOGLE_CALL_BACK_URL,
}, (accessToken, resrehToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
        if (!email) {
            return done(null, false, { message: "no email founde" });
        }
        let user = yield user_model_1.User.findOne({ email });
        if (user) {
            user = yield user_model_1.User.create({
                email,
                name: profile.displayName,
                picture: profile.profileUrl,
                role: user_interface_1.Role.USER,
                isVerified: true,
                auths: [
                    {
                        provider: "google",
                        providerId: profile.id
                    }
                ]
            });
        }
        return done(null, user_model_1.User);
    }
    catch (error) {
        console.log("GOole stategy Error", error);
        return done(error);
    }
})));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(id);
        done(null, user);
    }
    catch (error) {
        console.log(error);
        done(error);
    }
}));
