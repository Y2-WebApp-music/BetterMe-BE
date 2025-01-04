import { Elysia } from "elysia";
import { createGoal, getTodayGoal } from '../Controller/goal/GoalController';

const router = new Elysia().group("/goal", (app) =>
    app
        .post("/create", createGoal)
        .get("/today/:uid", getTodayGoal)
);

export default router;
