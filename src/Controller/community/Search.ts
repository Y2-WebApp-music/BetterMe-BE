import { Elysia } from "elysia";
import { Post, PostModel } from "../../Model/Community";
import { Goal, GoalModel } from "../../Model/Goal";

const app = new Elysia();

interface SearchBody {
    keyword: string;
    tag: number[];
}

export const searchPost = app.post("/post/search", async ({ body }: { body: SearchBody }) => {
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
