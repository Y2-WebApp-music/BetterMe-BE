import { Elysia } from "elysia";
import { GoalModel } from "../../Model/Goal";

export const updateTaskStatus = new Elysia().put("/:goal_id/task-status", async (
    { params, body }: {
        params: { goal_id: string },
        body: { task_index: number, status: boolean }
    }
) => {
    try {
        const { goal_id } = params;
        const { task_index, status } = body;

        const goal = await GoalModel.findById(goal_id);
        if (!goal) {
            return { message: "Goal not found" };
        }

        if (task_index < 0 || task_index >= goal.tasks.length) {
            return { message: "Task index out of range" };
        }

        if (status !== false && status !== true) {
            return { message: "Invalid status" };
        }

        goal.tasks[task_index].status = status;
        await goal.save();

        return {
            message: "Update task success",
            goal: goal.goal_name,
            task: goal.tasks[task_index],
        };
    } catch (error) {
        console.log(error);
    }
});
