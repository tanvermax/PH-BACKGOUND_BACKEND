import z from "zod";


export const CreateDivisionZOdSchema = z.object({
    name: z.string({ error: "Name must be string" }).min(1, {
        message: "Name is too short , minimum 1 characters",
    }),
    thumbnile: z.string({ error: "thumbnile must be string" }).optional(),
    description: z.string({ error: "description must be string" }).optional(),
})

export const UpdateDivisonSchema = z.object({
    name: z.string({ error: "Name must be string" }).min(1, {
        message: "Name is too short , minimum 1 characters",
    }),
    thumbnile: z.string({ error: "thumbnile must be string" }).optional(),
    description: z.string({ error: "description must be string" }).optional(),
})

