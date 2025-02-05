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

const weekRange = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
}

export const getWeeklyMeal = app.get("/meal/weekly/:date", async ({ jwt, cookie: { token }, params }) => {
    try {
        const { date } = params;

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const range = weekRange(new Date(date));
        const meals = await MealModel.find({
            meal_date: { $gte: range.start, $lte: range.end },
            create_by: user_id
        });
        if (!meals || meals.length === 0) {
            return { message: "No meals found" };
        }

        // Group meals by date
        const summary: Record<string, any> = {};

        meals.forEach(meal => {
            const mealDate = meal.meal_date.toISOString().split('T')[0];
            if (!summary[mealDate]) {
                summary[mealDate] = {
                    date: mealDate,
                    total_calorie: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    meal: []
                };
            }

            summary[mealDate].total_calorie += meal.calorie;
            summary[mealDate].protein += meal.protein;
            summary[mealDate].carbs += meal.carbs;
            summary[mealDate].fat += meal.fat;

            summary[mealDate].meal.push({
                meal_id: meal._id.toString(),
                calorie: meal.calorie,
                meal_date: meal.meal_date,
                food_name: meal.food_name,
                createByAI: meal.createByAI
            });
        });

        return Object.values(summary); // Remove date keys
    } catch (error) {
        console.log(error);
    }
});



// Count goals status of user
export const countGoals = app.get("/goal/count", async ({ jwt, cookie: { token } }) => {
    try {
        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const goals = await GoalModel.find({ create_by: user_id });

        const completeGoals = goals.filter(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return completeTaskCount === goal.tasks.length;
        });

        const inProgressGoals = goals.filter(goal => {
            const today = new Date();
            const end_date = new Date(goal.end_date);
            end_date.setDate(end_date.getDate() + 1);
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return (completeTaskCount < goal.tasks.length) && (today <= end_date);
        });

        const failGoals = goals.filter(goal => {
            const today = new Date();
            const end_date = new Date(goal.end_date);
            end_date.setDate(end_date.getDate() + 1);
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return (completeTaskCount < goal.tasks.length) && (today > end_date);
        });


        return {
            completed: completeGoals.length,
            in_progress: inProgressGoals.length,
            failed: failGoals.length,
        };
    } catch (error) {
        console.log(error);
    }
});
