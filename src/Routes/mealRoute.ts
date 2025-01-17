import { Elysia } from "elysia";
import { addMealByUser } from "../Controller/meal/MealController";

const mealRoute = new Elysia().group("/meal", (app) =>
    app
        .use(addMealByUser) // POST /meal/by-user
);

export default mealRoute;
