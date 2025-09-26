import { Date, Types } from "mongoose";

export interface ITourTypes{
    name:string,
    
}
export interface ITour {
    title:string,
    slug:string,
    description:string,
    image:string[],
    location?:string,
    costForm?:number,
    startDate?:Date,
    endDate?:Date,
    include?:string[],
    exclude?:string[],
    amenities?: string[],
    tourPlan?: string,
    maxGuest?: number,
    minGuest?:number,
    division: Types.ObjectId,
    tourType:Types.ObjectId

}