"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globalerrorhandler_1 = require("./app/middlewares/globalerrorhandler");
const notfounde_1 = __importDefault(require("./app/middlewares/notfounde"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("../src/app/config/passport");
const env_1 = require("./app/config/env");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
}));
// express session
app.use((0, express_session_1.default)({
    secret: env_1.envVars.EXPRESS_SESSION_SECRECT,
    resave: false,
    saveUninitialized: false
}));
// passportjs
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/v1", routes_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Tour Management system backed"
    });
});
// eslint-disble-next-line @typesrpt-
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalerrorhandler_1.globalErrorHandler);
app.use(notfounde_1.default);
exports.default = app;
