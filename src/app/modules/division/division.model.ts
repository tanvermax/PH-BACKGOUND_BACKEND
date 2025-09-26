import { model, Schema } from "mongoose";
import { IDivivsion } from "./divison.interface";




const divisionSchema = new Schema<IDivivsion>({
    name: { type: String, required: true },
    thumbnile: { type: String },
    description: { type: String, required: true },

}, { timestamps: true })




divisionSchema.pre("save", async function (next) {


    if (this.isModified("name")) {
        const baseSlug = this.name.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}-division`;
        let counter = 0;
        
        while (await Division.exists({ slug })) {

            slug = `${slug}-${counter++}`
        }
        this.slug = slug
    }
    next()
})



divisionSchema.pre("findOneAndUpdate", async function (next) {

    const division = this.getUpdate as Partial<IDivivsion>

    if (division.name) {
        const baseslug= division.name.toLocaleLowerCase().split(" ").join("-")
        let slug = `${baseslug}-division`;
        let counter = 0;
        while (await Division.exists({ slug })) {

            slug = `${slug}-${counter++}`
        }
        division.slug = slug
    }
    next()
})
export const Division = model<IDivivsion>("Division", divisionSchema)