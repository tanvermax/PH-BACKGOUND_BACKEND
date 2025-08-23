// eslint-disable-next-line @typescript-eslint/no-unused-vars
import z, { object } from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string({ error: "Name must be string" }).min(2, {
        message: "Name is too short , minimum 2 characters",
    })
        .max(50, {
            message: "Name is too long , maximum 50 characters",
        }),
    email: z
        .string({ error: "Email is required" })
        .email({ message: "Invalid email format" }),
    password: z
        .string({ error: "Password is required" })
        .min(8)
        .regex(
            /^(?=(?:.*[^A-Za-z0-9]){2,})(?=.*[A-Z])(?=.*\d).{8,}$/,
            {
                message:
                    "Password must be at least 8 characters long, contain 1 uppercase letter, 1 digit, and 2 special characters",
            }
        ),
    phone: z
        .string({ error: "Phone number must be string" })
        .min(11, { message: "Minimum 11 characters" })
        .regex(/^(?:\+880|880|0)(1[3-9])[0-9]{8}$/, {
            message:
                "Invalid Bangladeshi phone number format. Format: +880xxxxxxxxxx or 01xxxxxxxxx",
        })
        .optional(),


    address: z
        .string({ error: "Address must be string" })
        .optional(),

})

export const updateUserZodSchema = z.object({
    name: z.string({ error: "Name must be string" }).min(2, {
        message: "Name is too short , minimum 2 characters",
    })
        .max(50, {
            message: "Name is too long , maximum 50 characters",
        }).optional(),

    password: z
        .string({ error: "Password is required" })
        .min(8)
        .regex(
            /^(?=(?:.*[^A-Za-z0-9]){2,})(?=.*[A-Z])(?=.*\d).{8,}$/,
            {
                message:
                    "Password must be at least 8 characters long, contain 1 uppercase letter, 1 digit, and 2 special characters",
            }
        ).optional(),
    phone: z
        .string({ error: "Phone number must be string" })
        .min(11, { message: "Minimum 11 characters" })
        .regex(/^(?:\+880|880|0)(1[3-9])[0-9]{8}$/, {
            message:
                "Invalid Bangladeshi phone number format. Format: +880xxxxxxxxxx or 01xxxxxxxxx",
        })
        .optional(),


    address: z
        .string({ error: "Address must be string" })
        .optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
    isActive: z.enum(Object.values(IsActive) as [string]).optional(),
    isDeleted:z
    .boolean({error:"isDeleted must be tru or false"}).optional(),
    isverified: z
    .boolean({error:"isverified must be true or false"}).optional()


})