/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorhelpers/AppError"
import { Zodvalidation } from "../helper/Zodvalidation";
import { handleValidationerror } from "../helper/handleValidationerror";
import { handleCastError } from "../helper/handleCastError";
import { handleDuplicateError } from "../helper/handleDuplicateError";





// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    // console.log("err error", err)

    let statusCode = 500
    let message = "Something went wrong!! "

    // T@nver321$
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errorSources: any = []

    if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }
    else if (err.home === "CastEroor") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
    }
    else if (err.name === "ValidationError") {

        const simplifiedError = handleValidationerror(err);

        statusCode = simplifiedError.statusCode;

        errorSources = simplifiedError.errorSources;
        message = simplifiedError.message


    }
    else if (err.name === "ZodError") {
        const simplifiedError = Zodvalidation(err)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        errorSources = simplifiedError.errorSources
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }
    res.status(statusCode).json({
        success: false,
        message,
        err: envVars.NODE_ENV === "development" ? err.stack : undefined,
        stack: envVars.NODE_ENV === "development" ? err.stack : null

    })
}