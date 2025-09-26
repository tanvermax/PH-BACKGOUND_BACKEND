/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";
import { catchAsync } from "../../util/catchasync";
import { sendResponse } from "../../util/sendresponse";
import { verifytoken } from "../../util/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";




const createUserFunction = async (req: Request, res: Response) => {
    const user = await userServices.createUser(req.body)

    res.status(httpStatus.CREATED).json({
        message: "User createwd sussesful",
        user

    })

}

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         // throw new Error( "fake error")
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error")
//         createUserFunction(req, res)

//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//         // eslint-disable-next-line no-console
//         console.log(error);
//         next(error)
//     }
// }
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body)

    sendResponse(res, {

        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        success: true,
        data: user,
    })
})


const upadteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifytoken(token as string, envVars.JWT_ACCESS_TOKNE) as JwtPayload;
    const verifiedToken = req.user;
    const payload = req.body

    const user = await userServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    sendResponse(res, {

        statusCode: httpStatus.CREATED,
        message: "User updated successfully",
        success: true,
        data: user,
    })
})


const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUser();
    // res.status(201).json({
    //     success: true,
    //     message: "All user Recive succesfully",
    //     data: user
    // })

    sendResponse(res, {

        statusCode: httpStatus.CREATED,
        message: "all user retrive  successfully",
        success: true,
        data: result.data,
        meta: result.meta
    })
}) 


export const UserControlllers = {
    createUser, getAllUser, upadteUser
}


