"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ error: "Name must be string" }).min(2, {
        message: "Name is too short , minimum 2 characters",
    })
        .max(50, {
        message: "Name is too long , maximum 50 characters",
    }),
    email: zod_1.default
        .string({ error: "Email is required" })
        .email({ message: "Invalid email format" }),
    password: zod_1.default
        .string({ error: "Password is required" })
        .min(8)
        .regex(/^(?=(?:.*[^A-Za-z0-9]){2,})(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message: "Password must be at least 8 characters long, contain 1 uppercase letter, 1 digit, and 2 special characters",
    }),
    phone: zod_1.default
        .string({ error: "Phone number must be string" })
        .min(11, { message: "Minimum 11 characters" })
        .regex(/^(?:\+880|880|0)(1[3-9])[0-9]{8}$/, {
        message: "Invalid Bangladeshi phone number format. Format: +880xxxxxxxxxx or 01xxxxxxxxx",
    })
        .optional(),
    address: zod_1.default
        .string({ error: "Address must be string" })
        .optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string({ error: "Name must be string" }).min(2, {
        message: "Name is too short , minimum 2 characters",
    })
        .max(50, {
        message: "Name is too long , maximum 50 characters",
    }).optional(),
    password: zod_1.default
        .string({ error: "Password is required" })
        .min(8)
        .regex(/^(?=(?:.*[^A-Za-z0-9]){2,})(?=.*[A-Z])(?=.*\d).{8,}$/, {
        message: "Password must be at least 8 characters long, contain 1 uppercase letter, 1 digit, and 2 special characters",
    }).optional(),
    phone: zod_1.default
        .string({ error: "Phone number must be string" })
        .min(11, { message: "Minimum 11 characters" })
        .regex(/^(?:\+880|880|0)(1[3-9])[0-9]{8}$/, {
        message: "Invalid Bangladeshi phone number format. Format: +880xxxxxxxxxx or 01xxxxxxxxx",
    })
        .optional(),
    address: zod_1.default
        .string({ error: "Address must be string" })
        .optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.IsActive)).optional(),
    isDeleted: zod_1.default
        .boolean({ error: "isDeleted must be tru or false" }).optional(),
    isverified: zod_1.default
        .boolean({ error: "isverified must be true or false" }).optional()
});
