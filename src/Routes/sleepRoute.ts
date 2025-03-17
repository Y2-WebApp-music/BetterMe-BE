import { Elysia } from "elysia";
import { createSleep } from "../Controller/sleep/CreateSleep";
import { updateSleep } from "../Controller/sleep/UpdateSleep";
import { getTotalSleepTime, getWeeklySleep, getSleepData } from "../Controller/sleep/GetSleep";

const sleepRoute = new Elysia().group("/sleep", (app) =>
    app
        .use(createSleep) // POST /sleep/create
        .use(updateSleep) // PUT /sleep/update/:sleep_id

        .use(getTotalSleepTime) // GET /sleep/total-time?date=&id=
        .use(getWeeklySleep) // GET /sleep/weekly?date=&id=
        .use(getSleepData) // GET /sleep/data?date=&id=
);

export default sleepRoute;