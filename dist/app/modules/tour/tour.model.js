"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = exports.TourType = void 0;
const mongoose_1 = require("mongoose");
const tourTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });
exports.TourType = (0, mongoose_1.model)("TourType", tourTypeSchema);
const tourSchema = new mongoose_1.Schema({
    title: { type: String },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Division",
        required: true
    },
    tourType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "TourType",
        required: true
    }
}, { timestamps: true });
exports.Tour = (0, mongoose_1.model)("Tour", tourSchema);
