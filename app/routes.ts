import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/(pages)/auth/login.tsx"),
    // API resource routes (proxied to backend)
    route("/api/v1/auth/login", "routes/api.v1.auth.login.ts"),
    // route("/register", "routes/(pages)/auth/register.tsx"),
        route("/", "routes/(protected)/_layout.tsx", [
            route("/dashboard", "routes/(protected)/dashboard.tsx"),
            route("/reports/to-be-loaded", "routes/(protected)/clients/reports/to-be-loaded.tsx"),
            route("/reports/on-water", "routes/(protected)/clients/reports/on-water.tsx"),
            route("/reports/under-clearance", "routes/(protected)/clients/reports/under-clearance.tsx"),
            route("/reports/invoice-status", "routes/(protected)/clients/reports/invoice-status.tsx"),
        ]),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
