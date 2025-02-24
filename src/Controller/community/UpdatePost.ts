import { Elysia } from "elysia";
import { Post, PostModel } from "../../Model/Community";

const app = new Elysia();

export const updatePost = app.put("/post/update/:post_id", async (
    { params, body }: {
        params: { post_id: string },
        body: Post
    }
) => {
    try {
        const { post_id } = params;
        const updateFields = body;

        const post = await PostModel.findByIdAndUpdate(post_id, updateFields, { new: true });
        if (!post) {
            return { message: "Post not found" };
        }

        return {
            message: "Update post success",
            post
        };
    } catch (error) {
        console.log(error);
    }
});
