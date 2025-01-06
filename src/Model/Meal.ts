import { ObjectId, Schema, model } from "mongoose";

export interface Meal {
    user_uid: string;
    meal_date: Date;
    food_name: string;
    image: string;
    portion: string;
    calorie: number;
    protein: number;
    carbs: number;
    fat: number;
}

const MealSchema = new Schema<Meal>({
    user_uid: {
        type: String,
        ref: "User",
    },
    meal_date: Date,
    food_name: String,
    image: String,
    portion: String,
    calorie: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
});

export const MealModel = model<Meal>("Meal", MealSchema);
