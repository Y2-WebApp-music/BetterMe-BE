import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { register } from "../Controller/user/RegisterController";
import { login } from "../Controller/user/LoginController";
import { getUserById, getProfile } from "../Controller/user/UserController";

const router = new Elysia().group("/user", (app) =>
    app
        .use(jwt({
            secret: String(process.env.JWT_SECRET),
            exp: "1d",
        }))
        .post("/register", register)
        .post("/login", login)
        .get("/:uid", getUserById)
        .get("/profile", getProfile)
);

export default router;
