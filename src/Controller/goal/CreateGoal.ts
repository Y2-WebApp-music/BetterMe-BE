import { Elysia } from "elysia";
import { Goal, GoalModel } from "../../Model/Goal";
import { jwt } from '@elysiajs/jwt';

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

export const createGoal = app.post("/create", async ({ body, jwt, cookie: { token } }) => {
    try {
        const {
            goal_name,
            description,
            start_date,
            end_date,
            tasks,
            public_goal,
        } = body as Goal;

        if (!tasks) {
            return { message: "At least 1 task is required to create a goal" };
        }

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const taskStatus = tasks.map(task => ({
            ...task,
            status: task.status || 0
        }));

        const goal = new GoalModel({
            goal_name,
            description,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            create_by: user_id || null,
            tasks: taskStatus,
            public_goal: public_goal || false,
        });
        await goal.save();

        return {
            message: "Create goal success",
            goal,
        };
    } catch (error) {
        console.log(error);
    }
});
