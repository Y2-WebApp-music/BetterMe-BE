import { Elysia } from "elysia";
import { createSleep } from "../Controller/sleep/SleepController";

const sleepRoute = new Elysia().group("/sleep", (app) =>
    app
        .use(createSleep)
);

export default sleepRoute;