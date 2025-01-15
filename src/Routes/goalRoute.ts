import { Elysia, t } from "elysia";
import { createGoal } from '../Controller/goal/CreateGoal';
import {
    getUserGoal,
    getTodayGoal,
    getGoalCreate,
    getAllGoal,
    getGoalDetail,
    getCompleteGoal,
    getFailGoal,
    getInProgressGoal
} from "../Controller/goal/GetGoal";
import { changePublicGoal, updateGoal } from "../Controller/goal/UpdateGoal";
import { updateTaskStatus } from '../Controller/goal/UpdateTask';

const router = new Elysia().group("/goal", (app) =>
    app
        .use(createGoal) // POST /goal/create

        .use(getUserGoal) // GET /goal/user/:id
        .use(getGoalCreate) // GET /goal/create/:id
        .use(getAllGoal) // GET /goal/all
        .use(getGoalDetail) // GET /goal/detail/:id
        .use(getTodayGoal) // GET /goal/today/:id
        .use(getCompleteGoal) // GET /goal/complete/:id
        .use(getFailGoal) // GET /goal/fail/:id
        .use(getInProgressGoal) // GET /goal/in-progress/:id

        .use(changePublicGoal) // PUT /goal/public
        .use(updateGoal) // PUT /goal/update/:goal_id
        .use(updateTaskStatus) // PUT /goal/:goal_id/task-status
);

export default router;
