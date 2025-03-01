import { Elysia } from "elysia";
import { Comment, CommentModel, PostModel } from "../../Model/Community";

const app = new Elysia();

export const createComment = app.post("/comment/create", async (
    { query, body }: {
        query: { post_id: string },
        body: Comment
    }
) => {
    try {
        const { post_id } = query;
        const {
            content,
            create_by,
            comment_date
        } = body;

        const post = await PostModel.findById(post_id);
        if (!post) {
            return { message: "Post not found" };
        }

        const comment = new CommentModel({
            content,
            create_by,
            comment_date: comment_date || new Date(),
        });
        await comment.save();

        await post.updateOne({ $push: { comment: comment._id } });

        return {
            message: "Create comment success",
            comment
        };
    } catch (error) {
        console.log(error);
    }
});



export const deleteComment = app.delete("/comment/delete", async ({ query }) => {
    try {
        const { post_id, comment_id } = query;

        if (!post_id || !comment_id) {
            return { message: "Missing post_id or comment_id" };
        }

        const post = await PostModel.findById(post_id);
        if (!post) {
            return { message: "Post not found" };
        }

        const comment = await CommentModel.findById(comment_id);
        if (!comment) {
            return { message: "Comment not found" };
        }

        await comment.deleteOne();
        await post.updateOne({ $pull: { comment: comment_id } });

        return {
            message: "Delete comment success",
        };
    } catch (error) {
        console.log(error);
    }
});
