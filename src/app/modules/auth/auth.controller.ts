import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../util/catchasync"
import { sendResponse } from "../../util/sendresponse"
import httpStatus from "http-status-codes"
import { AuthService } from "./auth.service"
import AppError from "../../config/AppError"
import { setAuthCookie } from "../../util/setCookies"



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body)

    setAuthCookie(res, loginInfo)

//   setAuthCookie(res, {
//         accessToken: loginInfo.accesstoken,
//         refreshToken: loginInfo.refreshToken
//     })

    res.cookie("refreshToken", loginInfo.refreshToken, {
        httpOnly: true,
        secure: false
    });


    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "User Log in  successfully",
        success: true,
        data: loginInfo,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshtoken = req.cookies?.refreshToken

    if (!refreshtoken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies.")
    }

    const tokeninfo = await AuthService.getNewAccessToken(refreshtoken)

    //  setAuthCookie(res, tokeninfo);

    res.cookie("accessToken", tokeninfo.accesstoken, {
        httpOnly: true,
        secure: false
    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "User Log in  successfully",
        success: true,
        data: tokeninfo,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite:"lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite:"lax"
    })
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "User Logout  successfully",
        success: true,
        data: null,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reset_password = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const newPassword = req.body.newPassword;

    const oldPassword = req.body.oldPassword;

    const decodedToken = req.user;

    await AuthService.resetPassword(oldPassword,newPassword,decodedToken);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "password changed  successfully",
        success: true,
        data: null,
    })
})



export const AuthController = {
    credentialsLogin, getNewAccessToken,logout,reset_password
}