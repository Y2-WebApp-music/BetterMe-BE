import { Elysia } from "elysia";
import { Meal, MealModel } from "../../Model/Meal";

const app = new Elysia();

export const getMealDetail = app.get("/detail/:meal_id", async ({ params }) => {
    try {
        const { meal_id } = params;
        const meal = await MealModel.findById(meal_id).populate('create_by', 'firebase_uid username');
        if (!meal) {
            return { message: "Meal not found" };
        }

        const meal_data = {
            meal_id: meal._id.toString(),
            create_by: meal.create_by,
            meal_date: meal.meal_date,
            food_name: meal.food_name,
            image: meal.image_url,
            portion: meal.portion,
            calorie: meal.calorie,
            protein: meal.protein,
            carbs: meal.carbs,
            fat: meal.fat,
            createByAI: meal.createByAI
        }
        
        return meal_data;
    } catch (error) {
        console.log(error);
    } 
});
