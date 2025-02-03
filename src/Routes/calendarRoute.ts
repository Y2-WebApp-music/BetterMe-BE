import { Elysia } from "elysia";
import { getMeals, getGoals, getMealSummary } from "../Controller/calendar/CalendarController";

const calendarRoute = new Elysia().group("/calendar", (app) =>
    app
        .use(getMeals) // GET /calendar/meal/:date
        .use(getGoals) // GET /calendar/goal/:date
        .use(getMealSummary) // GET /calendar/meal/summary/:date
);

export default calendarRoute;
