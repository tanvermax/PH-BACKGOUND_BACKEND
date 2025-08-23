import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRequest = (zodSchema: ZodObject<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {

        try {
            // console.log("old body", req.body)

            req.body = await zodSchema.parseAsync(req.body);
            // console.log("new body", req.body)

            // console.log(req.body)
            next();
        } catch (error) {
            next(error)

        }
    }
