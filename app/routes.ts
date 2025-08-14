import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/(pages)/auth/login.tsx"),
    route("/register", "routes/(pages)/auth/register.tsx"),
    route("/dashboard", "routes/(protected)/dashboard.tsx"),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
