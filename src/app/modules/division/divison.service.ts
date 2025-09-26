/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import AppError from "../../errorhelpers/AppError";
import { Division } from "./division.model";
import { IDivivsion } from "./divison.interface";


const createDivisions = async (paylaod: IDivivsion) => {
    const isDivisionExit = await Division.findOne({ name: paylaod.name });
    
    if (isDivisionExit) {
        throw new AppError(httpStatus.BAD_REQUEST, "Division alredy exit in")
    }

    // const { name, slug, description, thumbnile } = paylaod;
    // const baseSlug = paylaod.name.toLowerCase().split(" ").join("-");
    // let counter = 0;
    // let slug = `${baseSlug}-division`;

    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}`
    // }
    // paylaod.slug = slug

    const division = await Division.create(paylaod)
    // console.log(division)

    return division;
}


const getAllDivisions = async (query: Record<string,string>) => {
    const filter = query
    console.log(filter)
    const divison = await Division.find(filter);

    const totalDivison = await Division.countDocuments();

    return {
        data: divison,
        meta: {
            total: totalDivison
        }
    }
}


const updatedivisions = async (id: string, payload: Partial<IDivivsion>) => {

    const ifDivison = await Division.findById(id);

    if (!ifDivison) {
        throw new AppError(httpStatus.FORBIDDEN, "Divison not found")

    }
    const dupliocateDivivson = await Division.findOne({
        name: payload.name,
        _id: { $ne: id }
    })
    if (dupliocateDivivson) {
        throw new Error("Division already exits")
    }
    if (payload.name) {
        // const { name, slug, description, thumbnile } = paylod;
        const baseSlug = payload.name.toLocaleLowerCase().split(" ").join("-");
        let counter = 0;
        let slug = `${baseSlug}-division`;
        while (await Division.exists({ slug })) {

            slug = `${slug}-${counter++}`
        }
        payload.slug = slug
    }
    const newDivivson = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return newDivivson

}



const deleteDivision = async (id: string) => {
    await Division.findByIdAndDelete(id);


    return null;

}
export const divisionService = {
    createDivisions, getAllDivisions, updatedivisions, deleteDivision
}
