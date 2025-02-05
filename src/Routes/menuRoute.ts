import { Elysia } from "elysia";
import { getWeeklyMeal, countGoals } from '../Controller/menu_tab/MenuController';

const menuRoute = new Elysia().group("/menu", (app) =>
    app
        .use(getWeeklyMeal) // GET /menu/meal/weekly/:date
        .use(countGoals) // GET /menu/goal/count
);

export default menuRoute;
