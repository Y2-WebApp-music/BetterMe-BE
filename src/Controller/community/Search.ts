import { Elysia } from "elysia";
import { Post, PostModel } from "../../Model/Community";
import { Goal, GoalModel } from "../../Model/Goal";

const app = new Elysia();

interface SearchBody {
    keyword: string;
    tag: number[];
}

export const searchPost = app.post("/search/post", async ({ body }: { body: SearchBody }) => {
    try {
        const { keyword } = body;

        const posts = await PostModel.find({
            content: { $regex: keyword, $options: "i" }
        }).populate("create_by", "username profile_img");

        const post_data = posts.map(post => {
            const likeCount = post.like.length;
            const commentCount = post.comment.length;
            return {
                post_id: post._id.toString(),
                create_by: post.create_by,
                date: post.post_date,
                content: post.content,
                tag: post.tag,
                image: post.image_url,
                like: likeCount,
                comment: commentCount,
            };
        })

        return post_data;
    } catch (error) {
        console.log(error);
        return error;
    }
});



export const searchPostByTag = app.post("/search/tag", async ({ body }: { body: SearchBody }) => {
    try {
        const { tag } = body;

        const posts = await PostModel.find({
            tag: { $in: tag }
        }).populate("create_by", "username profile_img");

        const post_data = posts.map(post => {
            const likeCount = post.like.length;
            const commentCount = post.comment.length;
            return {
                post_id: post._id.toString(),
                create_by: post.create_by,
                date: post.post_date,
                content: post.content,
                tag: post.tag,
                image: post.image_url,
                like: likeCount,
                comment: commentCount,
            };
        })

        return post_data;
    } catch (error) {
        console.log(error);
    }
});



export const searchGoal = app.post("/search/goal", async ({ body }: { body: SearchBody }) => {
    try {
        const { keyword } = body;

        const goals = await GoalModel.find({
            goal_name: { $regex: keyword, $options: "i" }
        }).populate("create_by", "username profile_img");

        const goal_data = goals.map(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return {
                goal_id: goal._id.toString(),
                goal_name: goal.goal_name,
                total_task: goal.tasks.length,
                start_date: goal.start_date,
                end_date: goal.end_date,
                complete_task: completeTaskCount,
                create_by: goal.create_by
            }
        })

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});
