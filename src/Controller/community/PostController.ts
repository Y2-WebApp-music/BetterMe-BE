import { Elysia } from "elysia";
import { Post, PostModel, Comment, CommentModel } from "../../Model/Community";

const app = new Elysia();

export const createPost = app.post("/post/create", async ({ body }: { body: Post }) => {
    try {
        const {
            content,
            image_url,
            tag,
            create_by
        } = body;

        const post = new PostModel({
            content,
            image_url,
            tag,
            create_by,
            post_date: new Date(),
        });
        await post.save();

        return {
            message: "Create post success",
            post
        };
    } catch (error) {
        console.log(error);
    }
});
