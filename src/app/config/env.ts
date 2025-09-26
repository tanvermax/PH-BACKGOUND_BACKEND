import dotenv from "dotenv";


dotenv.config();


interface Envonfig {
    PORT: number,
    DB_URL: string,
    NODE_ENV: "development" | "production",

    JWT_ACCESS_TOKNE: string,
    JWT_ACCESS_EXPIRES: string,
    BCRYPT_SALT_ROUND: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASSWORD: string,
    JWT_REFRESH_SECRECT: string,
    JWT_REFRESH_EXPIRES: string,

    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CLIENT_ID: string,
    EXPRESS_SESSION_SECRECT: string,
    FRONT_END_URL: string,
    GOOGLE_CALL_BACK_URL: string



}

const loadEnvVariables = (): Envonfig => {

    const requiredEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV",
        "JWT_ACCESS_TOKNE",
        "JWT_ACCESS_EXPIRES",
        "BCRYPT_SALT_ROUND",
        "SUPER_ADMIN_EMAIL",
        "SUPER_ADMIN_PASSWORD",
        "JWT_REFRESH_SECRECT",
        "JWT_REFRESH_EXPIRES",
        "GOOGLE_CLIENT_SECRET"
        , "GOOGLE_CLIENT_ID"
        , "EXPRESS_SESSION_SECRECT"
        , "FRONT_END_URL", "GOOGLE_CALL_BACK_URL"

    ];

    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`missing required environment variable ${key}`)
        }
    })
    return {
        PORT: Number(process.env.PORT) || 5000,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development",
        JWT_ACCESS_TOKNE: process.env.JWT_ACCESS_TOKNE as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        JWT_REFRESH_SECRECT: process.env.JWT_REFRESH_SECRECT as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        EXPRESS_SESSION_SECRECT: process.env.EXPRESS_SESSION_SECRECT as string,
        FRONT_END_URL: process.env.FRONT_END_URL as string,
        GOOGLE_CALL_BACK_URL: process.env.GOOGLE_CALL_BACK_URL as string


    }
}


export const envVars = loadEnvVariables();