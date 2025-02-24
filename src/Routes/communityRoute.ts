import { Elysia } from "elysia";
import { createPost } from "../Controller/community/CreatePost";
import { updatePost } from "../Controller/community/UpdatePost";
import { deletePost } from "../Controller/community/DeletePost";
import { createComment, deleteComment } from "../Controller/community/CommentController";
import { likePost, followUser } from "../Controller/community/LikeFollow";

const communityRoute = new Elysia().group("/community", (app) =>
    app
        .use(createPost) // POST /community/post/create
        .use(updatePost) // PUT /community/post/update/:post_id
        .use(deletePost) // DELETE /community/post/delete/:post_id

        .use(createComment) // POST /community/comment/create?post_id=
        .use(deleteComment) // DELETE /community/comment/delete?post_id=&comment_id=

        .use(likePost) // PUT /community/post/like?post_id=&user_id=
        .use(followUser) // PUT /community/user/follow?user_id=&follower_id=
);

export default communityRoute;
