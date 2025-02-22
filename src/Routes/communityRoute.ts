import { Elysia } from "elysia";
import { createPost } from "../Controller/community/PostController";
import { createComment } from "../Controller/community/CommentController";

const communityRoute = new Elysia().group("/community", (app) =>
    app
        .use(createPost) // POST /community/post/create

        .use(createComment) // POST /community/comment/create
);

export default communityRoute;
