"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zodvalidation = void 0;
const Zodvalidation = (err) => {
    const errorSources = [];
    err.issues.forEach((issue) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });
    return {
        statusCode: 400,
        message: "ZOd-Error",
        errorSources
    };
};
exports.Zodvalidation = Zodvalidation;
