import { Elysia } from "elysia";
import { createGoal, getTodayGoal, updatePublicGoal, getAllGoal, getCompleteGoal, getInProgressGoal, getFailGoal } from '../Controller/goal/GoalController';
import { updateTaskStatus } from '../Controller/goal/TaskController';

const router = new Elysia().group("/goal", (app) =>
    app
        .post("/create", createGoal)
        .get("/all", getAllGoal)
        .get("/today/:uid", getTodayGoal)
        .put("/:goal_id/update-task", updateTaskStatus)
        .put("/public/:goal_id", updatePublicGoal)
        .get("/complete/:uid", getCompleteGoal)
        .get("/in-progress/:uid", getInProgressGoal)
        .get("/fail/:uid", getFailGoal)
);

export default router;
