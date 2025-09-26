import express, { Request, Response } from "express";
import cors from "cors"
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalerrorhandler";
import notFound from "./app/middlewares/notfounde";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session"
import "../src/app/config/passport"
import { envVars } from "./app/config/env";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors({
    credentials: true,
}))


// express session
app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRECT,
    resave: false,
    saveUninitialized: false
}))
// passportjs
app.use(passport.initialize())
app.use(passport.session());
app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Tour Management system backed"
    })
})

// eslint-disble-next-line @typesrpt-
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalErrorHandler);

app.use(notFound)
export default app;