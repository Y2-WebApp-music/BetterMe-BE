import { Elysia } from "elysia";
import { Meal, MealModel } from "../../Model/Meal";
import { jwt } from '@elysiajs/jwt';
import axios from "axios";

const serverAI = String(process.env.SERVER_AI)

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

interface MealBody {
    image: string;
    portion: string;
}

export const getMealByAI = app.post("/by-ai", async ({ body }: { body: MealBody }) => {
    try {
        const { image, portion } = body;

        const base64 = image.split(",")[1]; // remove metadata prefix

        const response = await axios.post(`${serverAI}/image-caption`, {
            image: base64,
            portion
        });
        const meal_data = response.data;

        return meal_data;
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
