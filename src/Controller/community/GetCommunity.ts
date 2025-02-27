import { Elysia } from "elysia";
import { Post, PostModel } from "../../Model/Community";
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
                image: post.image_url,
                tag: post.tag,
                like: likeCount,
                comment: commentCount,
            };
        }); 

        return post_data;
    } catch (error) {
        console.log(error);
    }
});
