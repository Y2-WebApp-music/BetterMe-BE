import { Elysia } from "elysia";
import { Post, PostModel, Comment, CommentModel } from "../../Model/Community";
import { User, UserModel } from "../../Model/User";
import mongoose from "mongoose";

const app = new Elysia();

export const getUserPosts = app.get("/user-posts/:id", async ({ params }) => {
    try {
        const { id } = params;

        const posts = await PostModel.find({ create_by: id });

        const post_data = posts.map(post => {
            const likeCount = post.like.length;
            const commentCount = post.comment.length;
            return {
                post_id: post._id.toString(),
                date: post.post_date,
                content: post.content,
                tag: post.tag,
                image: post.image_url,
                like: likeCount,
                comment: commentCount,
            };
        }); 

        return post_data;
    } catch (error) {
        console.log(error);
    }
});



export const getPostDetail = app.get("/post/:post_id", async ({ params }) => {
    try {
        const { post_id } = params;

        const post = await PostModel.findById(post_id).populate("comment");
        if (!post) {
            return { message: "Post not found" };
        }

        const likeCount = post.like.length;
        const commentCount = post.comment.length;

        const post_data = {
            post_id: post._id.toString(),
            date: post.post_date,
            content: post.content,
            tag: post.tag,
            image: post.image_url,
            like: likeCount,
            comment_count: commentCount,
            comment: post.comment
        };

        return post_data;
    } catch (error) {
        console.log(error);
    }
});
