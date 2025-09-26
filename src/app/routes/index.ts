import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { DivisionRoute } from "../modules/division/division.route";
import { TourRoute } from "../modules/tour/tour.route";

export const router = Router();


const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path:"/auth",
        route: AuthRouter,
    }
    ,{
        path:"/division",
        route:DivisionRoute
    },
    {
        path:"/tour",
        route:TourRoute
    }
    //  {
    //     path: "/tour",
    //     route: TourRoute
    // },
]

moduleRoutes.forEach((route) => {
    {
        router.use(route.path, route.route)
    }
})