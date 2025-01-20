import { Elysia } from "elysia";
import { Meal, MealModel } from "../../Model/Meal";
import { jwt } from '@elysiajs/jwt';

const serverAI = String(process.env.SERVER_AI)

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

export const getMealByAI = app.post("/by-ai", async ({ body }: { body: Meal }) => {
    try {
        const {
            image_url,
            portion,
        } = body;

        const response = await fetch(`${serverAI}/image-caption`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_url }),
        });
        const meal_data = await response.json();

        return {
            message: "Get meal by AI success",
            meal_data
        };
    } catch (error) {
        console.log(error);
    }
});



export const addMeal = app.post("/add", async ({ body, jwt, cookie: { token } }) => {
    try {
        const {
            meal_date,
            food_name,
            image_url,
            portion,
            calorie,
            protein,
            carbs,
            fat,
            createByAI
        } = body as Meal;

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { message: "Invalid token" };
        }
        const user_id = validToken.user_id;

        const meal = new MealModel({
            create_by: user_id,
            meal_date,
            food_name,
            image_url,
            portion: portion || "",
            calorie,
            protein,
            carbs,
            fat,
            createByAI
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
