"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVariable = ["PORT", "DB_URL", "NODE_ENV",
        "JWT_ACCESS_TOKNE",
        "JWT_ACCESS_EXPIRES",
        "BCRYPT_SALT_ROUND",
        "SUPER_ADMIN_EMAIL",
        "SUPER_ADMIN_PASSWORD",
        "JWT_REFRESH_SECRECT",
        "JWT_REFRESH_EXPIRES",
        "GOOGLE_CLIENT_SECRET",
        "GOOGLE_CLIENT_ID",
        "EXPRESS_SESSION_SECRECT",
        "FRONT_END_URL", "GOOGLE_CALL_BACK_URL"
    ];
    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`missing required environment variable ${key}`);
        }
    });
    return {
        PORT: Number(process.env.PORT) || 5000,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_TOKNE: process.env.JWT_ACCESS_TOKNE,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
        JWT_REFRESH_SECRECT: process.env.JWT_REFRESH_SECRECT,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        EXPRESS_SESSION_SECRECT: process.env.EXPRESS_SESSION_SECRECT,
        FRONT_END_URL: process.env.FRONT_END_URL,
        GOOGLE_CALL_BACK_URL: process.env.GOOGLE_CALL_BACK_URL
    };
};
exports.envVars = loadEnvVariables();
