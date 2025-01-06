import { Meal, MealModel } from "../../Model/Meal";

export const addMeal = async ({ body }: { body: Meal }) => {
    try {
        const {
            user_uid,
            image,
            portion,
        } = body;

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image }),
        });
        const data = await response.json();

        const meal = new MealModel({
            user_uid,
            meal_date: new Date(),
            food_name: data.food_name,
            image,
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
};
