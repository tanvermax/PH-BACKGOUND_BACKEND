/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../util/catchasync";
import { sendResponse } from "../../util/sendresponse";
import { tourService } from "./tour.service";




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const creatTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    console.log("req.body in controller:", req.body);

    const division = await tourService.createTour(req.body);


    sendResponse(res, {

        statusCode: 201,
        message: "Tour created successfully",
        success: true,
        data: division,
    })
})

const getAlltours = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;
    
    console.log(query);

    const result = await tourService.getAllTour(query as Record<string, string>);

    sendResponse(res, {
        statusCode: 201,
        message: "all tour Service  successfully",
        success: true,
        data: result.data,
        meta: result.meta
    })
})

const updateTours = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const tourId = req.params.id;
    const divison = await tourService.updateTour(tourId, req.body)
    sendResponse(res, {
        statusCode: 201,
        message: "TOur updated successfully",
        success: true,
        data: divison,
    })
})

export const TourController = {
    creatTour, getAlltours, updateTours
}