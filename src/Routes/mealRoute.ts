import { Elysia } from "elysia";
import { addMealByUser } from "../Controller/meal/AddMeal";
import { getMealDatail } from "../Controller/meal/GetMeal";

const mealRoute = new Elysia().group("/meal", (app) =>
    app
        .use(addMealByUser) // POST /meal/by-user

        .use(getMealDatail) // GET /detail/:meal_id
);

export default mealRoute;
