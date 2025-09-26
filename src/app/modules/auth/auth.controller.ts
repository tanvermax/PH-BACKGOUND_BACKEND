import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../util/catchasync"
import { sendResponse } from "../../util/sendresponse"
import httpStatus from "http-status-codes"
import { AuthService } from "./auth.service"
import AppError from "../../errorhelpers/AppError"
import { setAuthCookie } from "../../util/setCookies"
import { createUserToken } from '../../util/user.token';
import { envVars } from '../../config/env';
import passport from 'passport';



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      passport.authenticate("local", async (err: any, user: any, info: any)=>{
        if (err) {
            return next(new AppError(401,err.message))
        }
        if (!user) {
           return next(new AppError(401, info?.message))
        }


        const userToken = await createUserToken(user)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: pass, ...rest } = user.toObject();

        setAuthCookie(res, userToken)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            message: "User Log in  successfully",
            success: true,
            data: {
                accessToken: userToken.accesstoken,
                refreshToken: userToken.refreshToken,
                user: rest
            }
        })
      })(req,res,next)
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
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
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

    await AuthService.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "password changed  successfully",
        success: true,
        data: null,
    })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const googlCallbackConmtroll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    let redirectTo = req.query.state ? req.query.state as string : " ";
    if (redirectTo.startsWith("/")) {
        redirectTo= redirectTo.slice(1)
    }

    const user = req.user;
    console.log(user);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }
    const tokenInfo = createUserToken(user);
    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONT_END_URL}/${redirectTo}`)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "password changed  successfully",
        success: true,
        data: null,
    })
})



export const AuthController = {
    credentialsLogin, getNewAccessToken, logout, reset_password, googlCallbackConmtroll
}