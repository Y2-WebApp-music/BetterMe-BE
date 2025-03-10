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
        });

        return posts;
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
        });

        return posts;
    } catch (error) {
        console.log(error);
    }
});



export const searchGoal = app.post("/search/goal", async ({ body }: { body: SearchBody }) => {
    try {
        const { keyword } = body;
        
        const goals = await GoalModel.find({
            goal_name: { $regex: keyword, $options: "i" }
        });

        return goals;
    } catch (error) {
        console.log(error);
    }
});
