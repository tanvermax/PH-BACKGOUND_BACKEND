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
exports.divisionService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorhelpers/AppError"));
const division_model_1 = require("./division.model");
const createDivisions = (paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const isDivisionExit = yield division_model_1.Division.findOne({ name: paylaod.name });
    if (isDivisionExit) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Division alredy exit in");
    }
    // const { name, slug, description, thumbnile } = paylaod;
    // const baseSlug = paylaod.name.toLowerCase().split(" ").join("-");
    // let counter = 0;
    // let slug = `${baseSlug}-division`;
    // while (await Division.exists({ slug })) {
    //     slug = `${slug}-${counter++}`
    // }
    // paylaod.slug = slug
    const division = yield division_model_1.Division.create(paylaod);
    // console.log(division)
    return division;
});
const getAllDivisions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = query;
    console.log(filter);
    const divison = yield division_model_1.Division.find(filter);
    const totalDivison = yield division_model_1.Division.countDocuments();
    return {
        data: divison,
        meta: {
            total: totalDivison
        }
    };
});
const updatedivisions = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ifDivison = yield division_model_1.Division.findById(id);
    if (!ifDivison) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Divison not found");
    }
    const dupliocateDivivson = yield division_model_1.Division.findOne({
        name: payload.name,
        _id: { $ne: id }
    });
    if (dupliocateDivivson) {
        throw new Error("Division already exits");
    }
    if (payload.name) {
        // const { name, slug, description, thumbnile } = paylod;
        const baseSlug = payload.name.toLocaleLowerCase().split(" ").join("-");
        let counter = 0;
        let slug = `${baseSlug}-division`;
        while (yield division_model_1.Division.exists({ slug })) {
            slug = `${slug}-${counter++}`;
        }
        payload.slug = slug;
    }
    const newDivivson = yield division_model_1.Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return newDivivson;
});
const deleteDivision = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield division_model_1.Division.findByIdAndDelete(id);
    return null;
});
exports.divisionService = {
    createDivisions, getAllDivisions, updatedivisions, deleteDivision
};
