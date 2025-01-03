import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { register } from "../Controller/user/RegisterController";
import { login } from "../Controller/user/LoginController";
import { secret_jwt } from "../config/env";

const router = new Elysia().group("/user", (app) => (
    app
    .use(jwt({ 
        name: "auth",
        secret: secret_jwt,
        exp: "1d",
    }))
    .post("/register", register)
    .post("/login", login)
));

export default router;
