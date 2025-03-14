import { Elysia } from "elysia";
import { Goal, GoalModel } from "../../Model/Goal";

const app = new Elysia();

export const changePublicGoal = app.put("/public/:goal_id", async (
    { params, body }: {
        params: { goal_id: string },
        body: { public_goal: boolean }
    }
) => {
    try {
        const { goal_id } = params;
        const { public_goal } = body;

        const goal = await GoalModel.findByIdAndUpdate(goal_id, { public_goal }, { new: true });
        if (!goal) {
            return { message: "Goal not found" };
        }

        return {
            message: "Update public goal status success",
            goal: goal.goal_name,
            public_goal: goal.public_goal,
        };
    } catch (error) {
        console.log(error);
    }
});



export const updateGoal = app.put("/update/:goal_id", async (
    { params, body }: {
        params: { goal_id: string },
        body: Goal
    }
) => {
    try {
        const { goal_id } = params;
        const updateFields = body;

        const goal = await GoalModel.findByIdAndUpdate(goal_id, updateFields, { new: true });
        if (!goal) {
            return { message: "Goal not found" };
        }

        return {
            message: "Update goal success",
            goal
        }
    } catch (error) {
        console.log(error);
    }
});
