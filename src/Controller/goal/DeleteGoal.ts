import { Elysia } from "elysia";
import { GoalModel } from "../../Model/Goal";

const app = new Elysia();

export const deleteGoal = app.delete("/delete/:goal_id", async ({ params }) => {
    try {
        const { goal_id } = params;
        const goal = await GoalModel.findByIdAndDelete(goal_id);
        if (!goal) {
            return { message: "Goal not found" };
        }
        return {
            message: "Delete goal success"
        };
    } catch (error) {
        console.log(error);
    }
});
