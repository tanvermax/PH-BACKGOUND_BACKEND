import { model, Schema } from "mongoose";
import { ITour, ITourTypes } from "./tour.interface";
const tourTypeSchema = new Schema<ITourTypes>({
    name: { type: String ,required:true,unique:true}
},{ timestamps: true })


export const TourType = model<ITourTypes>("TourType",tourTypeSchema)


const tourSchema = new Schema<ITour>({
    title: { type: String },
    description: { type: String },
    slug:{ type: String, required: true, unique: true },
    image: { type: [String], default: [] },
    location: { type: [String], default: [] },
    costForm: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    include: { type: [String], default: [] },
    exclude: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minGuest: { type: Number },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: true
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: "TourType",
        required: true
    }
}, { timestamps: true })

export const Tour = model<ITour>("Tour",tourSchema)