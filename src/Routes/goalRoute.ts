import { Elysia, t } from "elysia";
import { createGoal } from '../Controller/goal/CreateGoal';
import {
    getAllGoal,
    getTodayGoal,
    getGoalCreate,
    getGoalCard,
    getGoalDetail,
    getCompleteGoal,
    getFailGoal,
    getInProgressGoal
} from "../Controller/goal/GetGoal";
import { updatePublicGoal } from "../Controller/goal/UpdateGoal";
import { updateTaskStatus } from '../Controller/goal/UpdateTask';

const router = new Elysia().group("/goal", (app) =>
    app
        .use(createGoal) // POST /goal/create

        .use(getAllGoal) // GET /goal/all
        .use(getGoalCreate) // GET /goal/create/:id
        .use(getGoalCard) // GET /goal/card/:id
        .use(getGoalDetail) // GET /goal/detail/:id
        .use(getTodayGoal) // GET /goal/today/:id
        .use(getCompleteGoal) // GET /goal/complete/:id
        .use(getFailGoal) // GET /goal/fail/:id
        .use(getInProgressGoal) // GET /goal/in-progress/:id

        .use(updatePublicGoal) // PUT /goal/public
        .use(updateTaskStatus) // PUT /goal/task-status
);

export default router;
