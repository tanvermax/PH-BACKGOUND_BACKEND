import express, { Request, Response } from "express";
import cors from "cors"
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalerrorhandler";
import notFound from "./app/middlewares/notfounde";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors({
    credentials: true,
}))
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