import { Elysia } from "elysia";
import { User, UserModel } from "../../Model/User";
import { Goal, GoalModel } from "../../Model/Goal";
import { Meal, MealModel } from "../../Model/Meal";
import { jwt } from '@elysiajs/jwt';

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

const dateRange = (date: Date) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    return { start, end };
}

// get summary by date, use in calendar
// *date format: yyyy-mm-dd, time: 00:00:00

export const getMeals = app.get("/meal/:date", async ({ jwt, cookie: { token }, params }) => {
    try {
        const { date } = params;

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const range = dateRange(new Date(date));
        const meals = await MealModel.find({
            meal_date: { $gte: range.start, $lt: range.end },
            create_by: user_id
        });
        if (!meals) {
            return { message: "No meals found" };
        }

        const meal_data = meals.map(meal => {
            return {
                meal_id: meal._id.toString(),
                meal_date: meal.meal_date,
                food_name: meal.food_name,
                calorie: meal.calorie,
                createByAI: meal.createByAI
            }
        })

        return meal_data;
    } catch (error) {
        console.log(error);
    }
});
