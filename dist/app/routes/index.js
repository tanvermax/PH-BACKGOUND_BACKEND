"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const division_route_1 = require("../modules/division/division.route");
const tour_route_1 = require("../modules/tour/tour.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRouter,
    },
    {
        path: "/division",
        route: division_route_1.DivisionRoute
    },
    {
        path: "/tour",
        route: tour_route_1.TourRoute
    }
    //  {
    //     path: "/tour",
    //     route: TourRoute
    // },
];
moduleRoutes.forEach((route) => {
    {
        exports.router.use(route.path, route.route);
    }
});
