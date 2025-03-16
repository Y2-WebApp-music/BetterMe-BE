import { Elysia } from "elysia";
import { createSleep, updateSleep } from "../Controller/sleep/SleepController";

const sleepRoute = new Elysia().group("/sleep", (app) =>
    app
        .use(createSleep) // POST /sleep/create
        .use(updateSleep) // PUT /sleep/update/:sleep_id
);

export default sleepRoute;