import { Elysia } from "elysia";
import { createGoal } from '../Controller/goal/CreateGoal';
import {
    getUserGoals,
    getTodayGoals,
    getGoalCreate,
    getAllGoals,
    getGoalDetail,
    getCompleteGoals,
    getFailGoals,
    getInProgressGoals
} from "../Controller/goal/GetGoal";
import { changePublicGoal, updateGoal } from "../Controller/goal/UpdateGoal";
import { updateTaskStatus } from '../Controller/goal/UpdateTask';
import { deleteGoal } from "../Controller/goal/DeleteGoal";

const goalRoute = new Elysia().group("/goal", (app) =>
    app
        .use(createGoal) // POST /goal/create

        .use(getUserGoals) // GET /goal/user/:id
        .use(getGoalCreate) // GET /goal/create/:id
        .use(getAllGoals) // GET /goal/all
        .use(getGoalDetail) // GET /goal/detail/:id
        .use(getTodayGoals) // GET /goal/today/:id
        .use(getCompleteGoals) // GET /goal/complete/:id
        .use(getFailGoals) // GET /goal/fail/:id
        .use(getInProgressGoals) // GET /goal/in-progress/:id

        .use(changePublicGoal) // PUT /goal/public
        .use(updateGoal) // PUT /goal/update/:goal_id
        .use(updateTaskStatus) // PUT /goal/:goal_id/task-status

        .use(deleteGoal) // DELETE /goal/delete/:goal_id
);

export default goalRoute;
