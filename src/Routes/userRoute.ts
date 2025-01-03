import { Elysia } from "elysia";
import { register } from "../Controller/user/RegisterController";
import { login } from "../Controller/user/LoginController";
import { getAllUser, getUserById } from "../Controller/user/UserController";

const router = new Elysia().group("/user", (app) => 
    app
    .post("/register", register)
    .post("/login", login)
    .get("/", getAllUser)
    .get("/:id", getUserById)
);

export default router;
