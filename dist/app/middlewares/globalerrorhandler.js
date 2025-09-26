"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorhelpers/AppError"));
const Zodvalidation_1 = require("../helper/Zodvalidation");
const handleValidationerror_1 = require("../helper/handleValidationerror");
const handleCastError_1 = require("../helper/handleCastError");
const handleDuplicateError_1 = require("../helper/handleDuplicateError");
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
    // console.log("err error", err)
    let statusCode = 500;
    let message = "Something went wrong!! ";
    // T@nver321$
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorSources = [];
    if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.home === "CastEroor") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidationerror_1.handleValidationerror)(err);
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
        message = simplifiedError.message;
    }
    else if (err.name === "ZodError") {
        const simplifiedError = (0, Zodvalidation_1.Zodvalidation)(err);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        err: env_1.envVars.NODE_ENV === "development" ? err.stack : undefined,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null
    });
};
exports.globalErrorHandler = globalErrorHandler;
