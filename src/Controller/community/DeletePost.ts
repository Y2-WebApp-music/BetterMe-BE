import { Elysia } from "elysia";
import { Post, PostModel } from "../../Model/Community";

const app = new Elysia();

export const deletePost = app.delete("/post/delete/:post_id", async ({ params }) => {
    try {
        const { post_id } = params;

        const post = await PostModel.findById(post_id);
        if (!post) {
            return { message: "Post not found" };
        }
        await post.deleteOne();

        return {
            message: "Delete post success",
        };
    } catch (error) {
        console.log(error);
    }
});
