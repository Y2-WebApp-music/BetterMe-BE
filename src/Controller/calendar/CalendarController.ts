import { Elysia } from "elysia";
import { GoalModel } from "../../Model/Goal";
import { MealModel } from "../../Model/Meal";
import { jwt } from '@elysiajs/jwt';

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

const dateRange = (date: string) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    return { start, end };
}

const dayRange = (date: string) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return { startOfDay, endOfDay };
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

        const range = dateRange(date);
        const meals = await MealModel.find({
            meal_date: { $gte: range.start, $lte: range.end },
            create_by: user_id
        });
        if (!meals || meals.length === 0) {
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



export const getGoals = app.get("/goal/:date", async ({ jwt, cookie: { token }, params }) => {
    try {
        const { date } = params;

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const { startOfDay, endOfDay } = dayRange(date);
        const goals = await GoalModel.find({
            start_date: { $lte: endOfDay },
            end_date: { $gte: startOfDay },
            create_by: user_id
        });
        if (!goals || goals.length === 0) {
            return { message: "No goals found" };
        }

        const goal_data = goals.map(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return {
                goal_id: goal._id.toString(),
                goal_name: goal.goal_name,
                total_task: goal.tasks.length,
                complete_task: completeTaskCount,
                end_date: goal.end_date,
            }
        })

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



export const getMealSummary = app.get("/meal/summary/:date", async ({ jwt, cookie: { token }, params }) => {
    try {
        const { date } = params;

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const range = dateRange(date);
        const meals = await MealModel.find({
            meal_date: { $gte: range.start, $lte: range.end },
            create_by: user_id
        });
        if (!meals || meals.length === 0) {
            return { message: "No meals found" };
        }

        let total_calorie = 0;
        let total_protein = 0;
        let total_carbs = 0;
        let total_fat = 0;
        meals.forEach(meal => {
            total_calorie += meal.calorie;
            total_protein += meal.protein;
            total_carbs += meal.carbs;
            total_fat += meal.fat;
        });

        return {
            total_calorie,
            total_protein,
            total_carbs,
            total_fat
        };
    } catch (error) {
        console.log(error);
    }
});
