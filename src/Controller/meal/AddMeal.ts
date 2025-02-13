import { Elysia } from "elysia";
import { Meal, MealModel } from "../../Model/Meal";
import { jwt } from '@elysiajs/jwt';
import axios from "axios";

const serverAI = String(process.env.SERVER_AI);

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

        // Log the base64 string safely
        console.log(image)
        const response = await axios.post(`${serverAI}/image-caption`, {
            image: base64,
            portion
        });

        return { status: 200, data: response.data };
    } catch (error) {
        console.error("Error in getMealByAI:", error);
        return { status: 500, message: "Internal Server Error" };
    }
});

export const addMeal = app.post("/add", async ({ body, jwt, cookie: { token } }) => {
    try {
        if (!token || !token.value) {
            return { status: 401, message: "Unauthorized: No token provided" };
        }

        const validToken = await jwt.verify(token.value);
        if (!validToken) {
            return { status: 403, message: "Invalid token" };
        }

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

        if (!meal_date || !food_name || !image_url || calorie === undefined || protein === undefined || carbs === undefined || fat === undefined) {
            return { status: 400, message: "Missing required meal details" };
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
            status: 201,
            message: "Meal added successfully",
            meal
        };
    } catch (error) {
        console.error("Error in addMeal:", error);
        return { status: 500, message: "Internal Server Error" };
    }
});
