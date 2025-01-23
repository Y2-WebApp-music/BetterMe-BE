import { Elysia } from "elysia";
import { addMeal, getMealByAI } from "../Controller/meal/AddMeal";
import { getMealDetail } from "../Controller/meal/GetMeal";

const mealRoute = new Elysia().group("/meal", (app) =>
    app
        .use(addMeal) // POST /meal/add
        .use(getMealByAI) // POST /meal/by-ai

        .use(getMealDetail) // GET /meal/detail/:meal_id
);

export default mealRoute;
