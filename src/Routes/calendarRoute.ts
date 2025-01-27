import { Elysia } from "elysia";
import { getMeals } from "../Controller/calendar/CalendarController";

const calendarRoute = new Elysia().group("/calendar", (app) =>
    app
        .use(getMeals)
);

export default calendarRoute;
