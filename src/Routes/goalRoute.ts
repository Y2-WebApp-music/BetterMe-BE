import { Elysia } from "elysia";
import { createGoal, getTodayGoal, updatePublicGoal, getAllGoal, getCompleteGoal } from '../Controller/goal/GoalController';
import { updateTaskStatus } from '../Controller/goal/TaskController';

const router = new Elysia().group("/goal", (app) =>
    app
        .post("/create", createGoal)
        .get("/all", getAllGoal)
        .get("/today/:uid", getTodayGoal)
        .put("/:goal_id/update-task", updateTaskStatus)
        .put("/:goal_id/public", updatePublicGoal)
        .get("/:uid/complete", getCompleteGoal)
);

export default router;
