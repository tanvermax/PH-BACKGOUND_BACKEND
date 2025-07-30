import dotenv from "dotenv";


dotenv.config();

interface Envonfig {
    PORT: number,
    DB_URL: string,
    NODE_ENV: "development" | "production"
}

const loadEnvVariables = (): Envonfig => {

    const requiredEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV"];

    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`missing required environment variable ${key}`)
        }
    })
    return {
        PORT: Number(process.env.PORT) || 5000,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development"

    }
}


export const envVars = loadEnvVariables();