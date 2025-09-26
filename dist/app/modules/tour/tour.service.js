"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorhelpers/AppError"));
const tour_model_1 = require("./tour.model");
const tour_constant_1 = require("./tour.constant");
const QueryBuilder_1 = require("../../util/QueryBuilder");
const createTour = (paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const isTourExit = yield tour_model_1.Tour.findOne({ name: paylaod.title });
    if (isTourExit) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "tour alredy exit in");
    }
    // const { name, slug, description, thumbnile } = paylaod;
    const baseSlug = paylaod.title.toLocaleLowerCase().split(" ").join("-");
    let counter = 0;
    let slug = `${baseSlug}-tour`;
    while (yield tour_model_1.Tour.exists({ slug })) {
        slug = `${slug}-${counter++}`;
    }
    paylaod.slug = slug;
    console.log(paylaod);
    const tour = yield tour_model_1.Tour.create(paylaod);
    // console.log(tour)
    return tour;
});
const getAllTour = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter = query;
    // delete filter["searchTerm"]
    // const searchTerm = query.searchTerm || "";
    // const searchQuery = {
    //     $or: tourSearchfeild.map(
    //         field => ({
    //             [field]: {
    //                 $regex: searchTerm,
    //                 $options: "i"
    //             }
    //         })
    //     )
    // }
    // const sort = query.sort || "createdAt";
    // const page = Number(query.page) || 1;
    // const limit = Number(query.limit) || 10;
    // const skip = (page - 1) * limit;
    // const fields = query.fields.split(",").join(" ") || " "
    // for (const field of excludefield) {
    //     // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    //     delete filter[field]
    // }
    // // const tour = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit);
    // const filterQuery = Tour.find(filter);
    // const tours = filterQuery.find(searchQuery);
    // const allTour = await tours.sort(sort)
    //     .select(fields).skip(skip).limit(limit)
    // const totalTour = await Tour.countDocuments();
    // const totalPage = Math.ceil(totalTour / limit)
    const queryBuilder = new QueryBuilder_1.QueryBuilder(tour_model_1.Tour.find(), query);
    const tours = yield queryBuilder
        .Search(tour_constant_1.tourSearchfeild)
        .filter()
        .sort()
        .fields()
        .paginate();
    // const meta = await queryBuilder.getMeta()
    const [data, meta] = yield Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
const updateTour = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ifTour = yield tour_model_1.Tour.findById(id);
    if (!ifTour) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Tour not found");
    }
    const dupliocateDivivson = yield tour_model_1.Tour.findOne({
        name: payload.title,
        _id: { $ne: id }
    });
    if (dupliocateDivivson) {
        throw new Error("Tour already exits");
    }
    if (payload.title) {
        // const { name, slug, description, thumbnile } = paylod;
        const baseSlug = payload.title.toLocaleLowerCase().split(" ").join("-");
        let counter = 0;
        let slug = `${baseSlug}-Tour`;
        while (yield tour_model_1.Tour.exists({ slug })) {
            slug = `${slug}-${counter++}`;
        }
        payload.slug = slug;
    }
    const newTour = yield tour_model_1.Tour.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return newTour;
});
exports.tourService = {
    createTour, getAllTour, updateTour
};
