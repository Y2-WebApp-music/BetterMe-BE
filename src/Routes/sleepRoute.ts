import { Elysia } from "elysia";
import { createSleep } from "../Controller/sleep/CreateSleep";

const sleepRoute = new Elysia().group("/sleep", (app) =>
    app
        .use(createSleep)
);

export default sleepRoute;