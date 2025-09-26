import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken"
import { envVars } from "../config/env"
import { IsActive, IUser } from "../modules/user/user.interface"
import { genaratetoken, verifytoken } from "./jwt"
import AppError from "../errorhelpers/AppError"
import { User } from '../modules/user/user.model';

export const createUserToken = (user: Partial<IUser>) => {

    const JwtPayload = {
        role: user.role,
        userId: user._id,
        email: user.email,
    }

    const accesstoken = genaratetoken(JwtPayload,
        envVars.JWT_ACCESS_TOKNE,
        envVars.JWT_ACCESS_EXPIRES)


    const refreshToken = genaratetoken(JwtPayload,
        envVars.JWT_REFRESH_SECRECT,
        envVars.JWT_REFRESH_EXPIRES)


    return {

        accesstoken, refreshToken,
    }

}



export const createNewAccessTokenWithrefreshtoken = async (refreshToken: string) => {

    const verifiedRefresfToken = verifytoken(refreshToken, envVars.JWT_REFRESH_SECRECT) as JwtPayload;


    const IsUserExit = await User.findOne({ email: verifiedRefresfToken.email });



    if (!IsUserExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "User not found")
    }

    if (IsUserExit.isActive === IsActive.BLOCKED || IsUserExit.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, `User not found ${IsActive}`)
    }

    if (IsUserExit.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, `User not found ${IsUserExit}`)
    }



    const JwtPayload = {
        role: IsUserExit.role,
        email: IsUserExit.email,
        userId: IsUserExit._id
    }
    const accesstoken = genaratetoken(
        JwtPayload,
        envVars.JWT_ACCESS_TOKNE,
        envVars.JWT_ACCESS_EXPIRES)

    return accesstoken;
}