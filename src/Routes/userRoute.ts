import { Elysia } from "elysia";
import { register, login, logout } from "../Controller/user/AuthController";
import { getUserById } from "../Controller/user/UserController";

const router = new Elysia().group("/user", (app) =>
    app
        .use(register) // post /user/register
        .use(login) // post /user/login
        .use(logout) // post /user/logout
        .use(getUserById) // get /user/profile/:uid
);

export default router;
