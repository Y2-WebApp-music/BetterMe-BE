import { Elysia } from "elysia";
import { createPost } from "../Controller/community/CreatePost";
import { updatePost } from "../Controller/community/UpdatePost";
import { deletePost } from "../Controller/community/DeletePost";
import { getUserPosts, getPostDetail, getPostFeed } from "../Controller/community/GetPost";
import { createComment, getComments, deleteComment } from "../Controller/community/CommentController";
import { likePost, followUser, getLikedPosts } from "../Controller/community/LikeFollow";
import { getGoalCards, getGoalDetailCommu } from "../Controller/goal/GetGoal";
import { searchPost, searchPostByTag, searchGoal } from "../Controller/community/Search";

const communityRoute = new Elysia().group("/community", (app) =>
    app
        .use(createPost) // POST /community/post/create
        .use(updatePost) // PUT /community/post/update/:post_id
        .use(deletePost) // DELETE /community/post/delete/:post_id

        .use(getUserPosts) // GET /community/user-posts/:id
        .use(getPostDetail) // GET /community/post/:post_id
        .use(getPostFeed) // GET /community/post/feed/:id?page=

        .use(createComment) // POST /community/comment/create?post_id=
        .use(getComments) // GET /community/comment?post_id=
        .use(deleteComment) // DELETE /community/comment/delete?post_id=&comment_id=

        .use(likePost) // PUT /community/post/like?post_id=&user_id=
        .use(followUser) // PUT /community/user/follow?user_id=&follower_id=
        .use(getLikedPosts) // GET /community/like-post/:id

        .use(getGoalCards) // GET /community/goal/card/:id
        .use(getGoalDetailCommu) // GET /community/goal/detail/:id

        .use(searchPost) // POST /community/search/post
        .use(searchPostByTag) // POST /community/search/tag
        .use(searchGoal) // POST /community/search/goal
);

export default communityRoute;
