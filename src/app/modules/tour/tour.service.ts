import httpStatus from 'http-status-codes';
import AppError from "../../errorhelpers/AppError";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";
import {  tourSearchfeild } from './tour.constant';
import { QueryBuilder } from '../../util/QueryBuilder';


const createTour = async (paylaod: ITour) => {
    const isTourExit = await Tour.findOne({ name: paylaod.title });
    if (isTourExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "tour alredy exit in")
    }
    // const { name, slug, description, thumbnile } = paylaod;
    const baseSlug = paylaod.title.toLocaleLowerCase().split(" ").join("-");
    let counter = 0;
    let slug = `${baseSlug}-tour`;
    while (await Tour.exists({ slug })) {
        slug = `${slug}-${counter++}`
    }
    paylaod.slug = slug
    console.log(paylaod)

    const tour = await Tour.create(paylaod)
    // console.log(tour)

    return tour;
}


const getAllTour = async (query: Record<string, string>) => {

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
   const queryBuilder = new QueryBuilder(Tour.find(), query)

    const tours = await queryBuilder
        .Search(tourSearchfeild)
        .filter()
        .sort()
        .fields()
        .paginate()

    // const meta = await queryBuilder.getMeta()

    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])


    return {
        data,
        meta
    }
}

const updateTour = async (id: string, payload: Partial<ITour>) => {

    const ifTour = await Tour.findById(id);

    if (!ifTour) {
        throw new AppError(httpStatus.FORBIDDEN, "Tour not found")

    }
    const dupliocateDivivson = await Tour.findOne({
        name: payload.title,
        _id: { $ne: id }
    })
    if (dupliocateDivivson) {
        throw new Error("Tour already exits")
    }
    if (payload.title) {
        // const { name, slug, description, thumbnile } = paylod;
        const baseSlug = payload.title.toLocaleLowerCase().split(" ").join("-");
        let counter = 0;
        let slug = `${baseSlug}-Tour`;
        while (await Tour.exists({ slug })) {

            slug = `${slug}-${counter++}`
        }
        payload.slug = slug
    }
    const newTour = await Tour.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return newTour

}

export const tourService = {
    createTour, getAllTour, updateTour
}