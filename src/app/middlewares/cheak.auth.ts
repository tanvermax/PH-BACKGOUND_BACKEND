import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import AppError from "../config/AppError";
import { verifytoken } from "../util/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { IsActive } from '../modules/user/user.interface';

export const CheckAuth = (...authRoles: string[]) =>  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accesToken = req.headers.authorization;
        if (!accesToken) {
            throw new AppError(403, "No Token recived")
        }

        const verifiedToken = verifytoken(accesToken, envVars.JWT_ACCESS_TOKNE) as JwtPayload;

        const IsUserExit = await User.findOne({ email: verifiedToken.email });



        if (!IsUserExit) {
            throw new AppError(httpStatus.BAD_REQUEST, "User not found")
        }

        if (IsUserExit.isActive === IsActive.BLOCKED || IsUserExit.isActive === IsActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User not found ${IsActive}`)
        }

        if (IsUserExit.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, `User not found ${IsUserExit}`)
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "you are not permited to acces")
        }
        req.user = verifiedToken;
        next()
    } catch (error) {
        next(error)
    }
}
