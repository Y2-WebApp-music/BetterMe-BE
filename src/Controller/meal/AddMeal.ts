import { Elysia } from "elysia";
import { Meal, MealModel } from "../../Model/Meal";
import { jwt } from '@elysiajs/jwt';

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

export const addMealByAI = app.post("/by-ai", async ({ body, jwt, cookie: { token } }) => {
    try {
        const {
            image_url,
            portion,
        } = body as Meal;

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_url }),
        });
        const data = await response.json();

        const meal = new MealModel({
            create_by: user_id,
            meal_date: new Date(),
            food_name: data.food_name,
            image_url,
            portion,
            calorie: data.calorie,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat
        });
        await meal.save();

        return {
            message: "Add meal success",
            meal
        };
    } catch (error) {
        console.log(error);
    }
});



export const addMealByUser = app.post("/by-user", async ({ body, jwt, cookie: { token } }) => {
    try {
        const {
            food_name,
            image_url,
            portion,
            calorie,
            protein,
            carbs,
            fat
        } = body as Meal;

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const meal = new MealModel({
            create_by: user_id,
            meal_date: new Date(),
            food_name,
            image_url,
            portion: portion || "",
            calorie,
            protein,
            carbs,
            fat,
            createByAI: false
        });
        await meal.save();

        return {
            message: "Add meal success",
            meal
        };
    } catch (error) {
        console.log(error);
    }
});
