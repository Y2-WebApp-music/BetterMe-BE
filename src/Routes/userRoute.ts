import { Elysia } from "elysia";
import { register, login, logout } from "../Controller/user/AuthController";
import { getUserById, updateUser } from "../Controller/user/UserController";

const router = new Elysia().group("/user", (app) =>
    app
        .use(register) // POST /user/register
        .use(login) // POST /user/login
        .use(logout) // POST /user/logout
        
        .use(getUserById) // GET /user/profile/:uid

        .use(updateUser) // PUT /user/update/:id
);

export default router;
