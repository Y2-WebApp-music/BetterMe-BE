import { Elysia } from "elysia";
import { addMeal, getMealByAI } from "../Controller/meal/AddMeal";
import { getMealDatail } from "../Controller/meal/GetMeal";

const mealRoute = new Elysia().group("/meal", (app) =>
    app
        .use(addMeal) // POST /meal/add
        .use(getMealByAI) // POST /meal/by-ai

        .use(getMealDatail) // GET /detail/:meal_id
);

export default mealRoute;
