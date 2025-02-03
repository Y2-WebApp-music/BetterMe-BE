import { Elysia } from "elysia";
import { getWeeklyMeal } from '../Controller/menu_tab/MenuController';

const menuRoute = new Elysia().group("/menu", (app) =>
    app
        .use(getWeeklyMeal) // GET /menu/meal/weekly/:date
);

export default menuRoute;
