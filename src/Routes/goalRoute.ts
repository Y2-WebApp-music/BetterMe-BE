import { Elysia } from "elysia";
import { createGoal, getTodayGoal } from '../Controller/goal/GoalController';
import { updateTaskStatus } from '../Controller/goal/TaskController';

const router = new Elysia().group("/goal", (app) =>
    app
        .post("/create", createGoal)
        .get("/today/:uid", getTodayGoal)
        .put("/:goal_id/update-task", updateTaskStatus)
);

export default router;
