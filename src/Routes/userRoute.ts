import { Elysia } from "elysia";
import { register } from "../Controller/user/RegisterController";
import { login } from "../Controller/user/LoginController";
import { getUserById } from "../Controller/user/UserController";

const router = new Elysia().group("/user", (app) =>
    app
        .post("/register", register)
        .post("/login", login)
        .get("/:uid", getUserById)
);

export default router;
