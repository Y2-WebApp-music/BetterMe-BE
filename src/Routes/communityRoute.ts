import { Elysia } from "elysia";
import { createPost } from "../Controller/community/PostController";

const communityRoute = new Elysia().group("/community", (app) =>
    app
        .use(createPost) // POST /community/post/create
);

export default communityRoute;
