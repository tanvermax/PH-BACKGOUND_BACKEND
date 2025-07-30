/*eslint-disable no-console*/
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server: Server;



// let age;


const startServer = async () => {
    try {

        // console.log(envVars.NODE_ENV)

        await mongoose.connect(envVars.DB_URL)

        console.log("connected to DB");


        server = app.listen(envVars.PORT, () => {
            console.log(`server is listening to port ${envVars.PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}

startServer();



process.on("SIGTERM", (err) => {
    console.log("SIGTERM Signal  Detected.. Server shutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1);
})


process.on("unhandledRejection", (err) => {
    console.log("Unhandle Rejection  Detected.. Server shutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1);
})


process.on("uncaughtException", (err) => {
    console.log("uncaughtException Rejection  Detected.. Server shutting down", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1);
})

// Promise.reject(new Error(" I forget to catch this promise"))

