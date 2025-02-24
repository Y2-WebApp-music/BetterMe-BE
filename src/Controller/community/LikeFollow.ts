import { Elysia } from "elysia";
import { User, UserModel } from "../../Model/User";
import { Comment, CommentModel, PostModel } from "../../Model/Community";

const app = new Elysia();

export const likePost = app.put("/post/like", async ({ query }) => {
    try {
        const { post_id, user_id } = query;

        if (!post_id || !user_id) {
            return { message: "Missing post_id or user_id" };
        }

        const post = await PostModel.findById(post_id);
        if (!post) {
            return { message: "Post not found" };
        }

        const alreadyLike = post.like.find((like) => like.toString() === user_id);
        if (alreadyLike) {
            await post.updateOne({ $pull: { like: user_id } });
            return {
                message: "Unlike post success",
            }
        } else {
            await post.updateOne({ $push: { like: user_id } });
            return {
                message: "Like post success",
            }
        }
    } catch (error) {
        console.log(error);
    }
});
