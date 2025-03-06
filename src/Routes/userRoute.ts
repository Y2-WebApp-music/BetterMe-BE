import { Elysia } from "elysia";
import { register, login, logout } from "../Controller/user/AuthController";
import { getUserById, updateUser, getFollow } from "../Controller/user/UserController";

const userRoute = new Elysia().group("/user", (app) =>
    app
        .use(register) // POST /user/register
        .use(login) // POST /user/login
        .use(logout) // POST /user/logout

        .use(getUserById) // GET /user/profile/:uid

        .use(updateUser) // PUT /user/update/:id

        .use(getFollow) // GET /user/follow/:id
);

export default userRoute;
