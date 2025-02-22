import { Elysia } from "elysia";
import { CommentModel, PostModel } from "../../Model/Community";

const app = new Elysia();

interface CommentBody {
    post_id: string;
    comment_id: string;
    content: string;
    create_by: string;
}

export const createComment = app.post("/comment/create", async ({ body }: { body: CommentBody }) => {
    try {
        const {
            post_id,
            content,
            create_by
        } = body;

        const post = await PostModel.findById(post_id);
        if (!post) {
            return { message: "Post not found" };
        }

        const comment = new CommentModel({
            content,
            create_by,
            comment_date: new Date(),
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



export const deleteComment = app.delete("/comment/delete", async ({ body }: { body: CommentBody }) => {
    try {
        const {
            post_id,
            comment_id
        } = body;

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
