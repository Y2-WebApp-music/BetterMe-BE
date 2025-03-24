import { Elysia } from "elysia";
import { Goal, GoalModel } from "../../Model/Goal";

const app = new Elysia();

export const createGoal = app.post("/create", async ({ body }: { body: Goal }) => {
    try {
        const {
            goal_name,
            description,
            start_date,
            end_date,
            tasks,
            public_goal,
            create_by
        } = body;

        if (!tasks) {
            return { message: "At least 1 task is required to create a goal" };
        }

        const taskStatus = tasks.map(task => ({
            ...task,
            status: task.status || 0
        }));

        const goal = new GoalModel({
            goal_name,
            description,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            create_by,
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
