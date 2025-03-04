import { Elysia } from "elysia";
import { Post, PostModel, Comment, CommentModel } from "../../Model/Community";
import { User, UserModel } from "../../Model/User";
import mongoose, { ObjectId } from "mongoose";

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



export const getPostFeed = app.get("/post/feed/:id", async ({ params }) => {
    try {
        const { id } = params;

        const user = await UserModel.findById(id);
        if (!user) {
            return { message: "User not found" };
        }

        const posts = await PostModel.find({ create_by: { $in: user.following } }).sort({ post_date: -1 });
        const posts2 = await PostModel.find({ create_by: { $nin: user.following } }).sort({ post_date: -1 });

        const likePosts = [...posts, ...posts2].filter(post => post.like.includes(id as any));
        const unlikePosts = [...posts, ...posts2].filter(post => !post.like.includes(id as any));

        const finalPosts = [...unlikePosts, ...likePosts];

        const post_data = finalPosts.map(post => {
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
