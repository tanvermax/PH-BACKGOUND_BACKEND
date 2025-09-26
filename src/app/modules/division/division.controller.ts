/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../util/catchasync"
import { divisionService } from "./divison.service"
import { sendResponse } from "../../util/sendresponse";
import { JwtPayload } from "jsonwebtoken";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createDivision = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.body in controller:", req.body);
    
    const division = await divisionService.createDivisions(req.body);
    sendResponse(res, {

        statusCode: 201,
        message: "division created successfully",
        success: true,
        data: division,
    })
})




const getAllDivison = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const query = req.query;
    console.log("query from controller", query)
    const result = await divisionService.getAllDivisions(query as Record<string,string>);
    // res.status(201).json({
    //     success: true,
    //     message: "All user Recive succesfully",
    //     data: user
    // })

    sendResponse(res, {

        statusCode: 201,
        message: "all user retrive  successfully",
        success: true,
        data: result.data,
        meta: result.meta
    })
})
const updateDivisions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const divisonId = req.params.id;
    const divison = await divisionService.updatedivisions(divisonId, req.body)
    sendResponse(res, {
        statusCode: 201,
        message: "User updated successfully",
        success: true,
        data: divison,
    })
})
const deleteDivisons = catchAsync(async (req: Request, res: Response, next: NextFunction) => {



    const divison = await divisionService.deleteDivision(req.params.id)

    sendResponse(res, {

        statusCode: 201,
        message: "divison delete successfully",
        success: true,
        data: divison,
    })
})


export const DivisionController={
    createDivision,getAllDivison,updateDivisions,deleteDivisons
}