import { Elysia } from "elysia";
import { getMeals, getGoals } from "../Controller/calendar/CalendarController";

const calendarRoute = new Elysia().group("/calendar", (app) =>
    app
        .use(getMeals)
        .use(getGoals)
);

export default calendarRoute;
