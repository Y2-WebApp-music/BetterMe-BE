import { Elysia } from "elysia";
import { createPost } from "../Controller/community/CreatePost";
import { deletePost } from "../Controller/community/DeletePost";
import { createComment, deleteComment } from "../Controller/community/CommentController";

const communityRoute = new Elysia().group("/community", (app) =>
    app
        .use(createPost) // POST /community/post/create
        .use(deletePost) // DELETE /community/post/delete/:post_id

        .use(createComment) // POST /community/comment/create
        .use(deleteComment) // DELETE /community/comment/delete
);

export default communityRoute;
