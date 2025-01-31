import { Elysia } from "elysia";
import { getMeals, getGoals, getSummaryMeal } from "../Controller/calendar/CalendarController";

const calendarRoute = new Elysia().group("/calendar", (app) =>
    app
        .use(getMeals) // GET /calendar/meal/:date
        .use(getGoals) // GET /calendar/goal/:date
        .use(getSummaryMeal) // GET /calendar/summary-meal/:date
);

export default calendarRoute;
