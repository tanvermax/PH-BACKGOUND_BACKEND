"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDivisonSchema = exports.CreateDivisionZOdSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateDivisionZOdSchema = zod_1.default.object({
    name: zod_1.default.string({ error: "Name must be string" }).min(1, {
        message: "Name is too short , minimum 1 characters",
    }),
    thumbnile: zod_1.default.string({ error: "thumbnile must be string" }).optional(),
    description: zod_1.default.string({ error: "description must be string" }).optional(),
});
exports.UpdateDivisonSchema = zod_1.default.object({
    name: zod_1.default.string({ error: "Name must be string" }).min(1, {
        message: "Name is too short , minimum 1 characters",
    }),
    thumbnile: zod_1.default.string({ error: "thumbnile must be string" }).optional(),
    description: zod_1.default.string({ error: "description must be string" }).optional(),
});
