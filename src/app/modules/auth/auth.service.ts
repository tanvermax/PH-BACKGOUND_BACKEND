import { JwtPayload } from 'jsonwebtoken';
import AppError from "../../config/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"

import { createNewAccessTokenWithrefreshtoken, createUserToken } from "../../util/user.token";
import { envVars } from '../../config/env';



const credentialsLogin = async (paylod: Partial<IUser>) => {


    const { email, password } = paylod;


    const IsUserExit = await User.findOne({ email });



    if (!IsUserExit) {
        throw new AppError(httpStatus.BAD_REQUEST,
            "User not found")
    }


    const isPasswordMatch = await bcryptjs.compare(password as string,
        IsUserExit.password as string)
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST,
            "Incorrect password")
    }

    const userToken = createUserToken(IsUserExit)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = IsUserExit.toObject()

    return {
        accesstoken: userToken.accesstoken,
        refreshToken: userToken.refreshToken,
        user: rest
    }

}

const getNewAccessToken = async (refreshToken: string) => {

    const newAccessToken = await createNewAccessTokenWithrefreshtoken(refreshToken)

    return {

        accesstoken: newAccessToken
    }

}

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId);

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    }
    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user.password as string);

    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "password does not match");
    }
    user.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));

    await user.save();

    return true;
}



export const AuthService = {
    credentialsLogin, getNewAccessToken, resetPassword
}