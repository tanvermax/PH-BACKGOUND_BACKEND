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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Division = void 0;
const mongoose_1 = require("mongoose");
const divisionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    thumbnile: { type: String },
    description: { type: String, required: true },
}, { timestamps: true });
divisionSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("name")) {
            const baseSlug = this.name.toLowerCase().split(" ").join("-");
            let slug = `${baseSlug}-division`;
            let counter = 0;
            while (yield exports.Division.exists({ slug })) {
                slug = `${slug}-${counter++}`;
            }
            this.slug = slug;
        }
        next();
    });
});
divisionSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const division = this.getUpdate;
        if (division.name) {
            const baseslug = division.name.toLocaleLowerCase().split(" ").join("-");
            let slug = `${baseslug}-division`;
            let counter = 0;
            while (yield exports.Division.exists({ slug })) {
                slug = `${slug}-${counter++}`;
            }
            division.slug = slug;
        }
        next();
    });
});
exports.Division = (0, mongoose_1.model)("Division", divisionSchema);
