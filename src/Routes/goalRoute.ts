import { Elysia } from "elysia";
import { createGoal } from '../Controller/goal/GoalController';

const router = new Elysia().group("/goal", (app) =>
    app
        .post("/create", createGoal)
);

export default router;
