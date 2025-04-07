import { Elysia } from "elysia";
import { Post, PostModel, Comment, CommentModel } from "../../Model/Community";
import { User, UserModel } from "../../Model/User";
import mongoose, { ObjectId } from "mongoose";

const app = new Elysia();

export const getUserPosts = app.get("/user-posts/:id", async ({ params }) => {
    try {
        const { id } = params;

        const posts = await PostModel.find({ create_by: id }).sort({ post_date: -1 });

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

        const post = await PostModel.findById(post_id)
            .populate({
                path: 'comment',
                populate: {
                    path: 'create_by',
                    select: 'username profile_img'
                }
            })
            .populate("create_by", "username profile_img");
        if (!post) {
            return { message: "Post not found" };
        }

        const likeCount = post.like.length;
        const commentCount = post.comment.length;

        const post_data = {
            post_id: post._id.toString(),
            create_by: post.create_by,
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



export const getPostFeed = app.get("/post/feed/:id", async ({ params, query }) => {
    try {
        const { id } = params;
        const { page = 1, limit = 10 } = query; // Default to page 1 and 10 posts per page

        const user = await UserModel.findById(id);
        if (!user) {
            return { message: "User not found" };
        }

        const posts = await PostModel.aggregate([
            {
                $facet: {
                    followingUserPosts: [
                        { $match: { create_by: { $in: user.following } } },
                        { $sort: { post_date: -1 } },
                    ],
                    otherPosts: [
                        { $match: { create_by: { $nin: user.following } } },
                        { $sort: { post_date: -1 } },
                    ],
                }
            },
            {
                $project: {
                    posts: { $concatArrays: ["$followingUserPosts", "$otherPosts"] }
                }
            },
            {
                $unwind: "$posts"
            },
            {
                $skip: (+page - 1) * +limit
            },
            {
                $limit: +limit
            }
        ]);

        const post_data = posts.map((post: any) => {
            const p = post.posts;
            const likeCount = p.like?.length || 0;
            const commentCount = p.comment?.length || 0;
            return {
                post_id: p._id.toString(),
                create_by: p.create_by,
                date: p.post_date,
                content: p.content,
                tag: p.tag,
                image: p.image_url,
                like: likeCount,
                comment: commentCount,
            };
        });

        return post_data;
    } catch (error) {
        console.log(error);
    }
});
