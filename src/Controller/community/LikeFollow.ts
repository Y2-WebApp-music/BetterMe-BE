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



export const followUser = app.put("/user/follow", async ({ query }) => {
    try {
        const { user_id, follower_id } = query;

        if (!user_id || !follower_id) {
            return { message: "Missing user_id or follower_id" };
        }

        const user1 = await UserModel.findById(user_id);
        if (!user1) {
            return { message: "User not found" };
        }

        const user2 = await UserModel.findById(follower_id);
        if (!user2) {
            return { message: "User not found (follower)" };
        }

        const alreadyFollow = user1.follower.find((follower) => follower.toString() === follower_id);
        if (alreadyFollow) {
            await user1.updateOne({ $pull: { follower: follower_id } });
            await user2.updateOne({ $pull: { following: user_id } });
            return {
                message: "Unfollow success",
            }
        } else {
            await user1.updateOne({ $push: { follower: follower_id } });
            await user2.updateOne({ $push: { following: user_id } });
            return {
                message: "Follow success",
            }
        }
    } catch (error) {
        console.log(error);
    }
});
