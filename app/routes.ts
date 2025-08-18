import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/(pages)/auth/login.tsx"),
    // route("/register", "routes/(pages)/auth/register.tsx"),
        route("/", "routes/(protected)/_layout.tsx", [
            route("/dashboard", "routes/(protected)/dashboard.tsx"),
            route("/reports/ongoing-jobs", "routes/(protected)/ongoing-jobs.tsx"),
        ]),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
