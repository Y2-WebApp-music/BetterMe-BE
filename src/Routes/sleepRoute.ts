import { Elysia } from "elysia";
import { createSleep, updateSleep, getTotalSleepTime, getWeeklySleep } from "../Controller/sleep/SleepController";

const sleepRoute = new Elysia().group("/sleep", (app) =>
    app
        .use(createSleep) // POST /sleep/create
        .use(updateSleep) // PUT /sleep/update/:sleep_id

        .use(getTotalSleepTime) // GET /sleep/total-time?date=&create_by=
        .use(getWeeklySleep) // GET /sleep/weekly?date=&create_by=
);

export default sleepRoute;