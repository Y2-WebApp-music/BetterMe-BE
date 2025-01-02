import { Elysia } from "elysia";
import { register, login } from "../Controller/user";

const router = new Elysia().group("/user", (app) => (
    app
    .post("/register", register)
    .post("/login", login)
));

export default router;
