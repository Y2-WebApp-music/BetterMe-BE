import { ObjectId, Schema, model } from "mongoose";

export interface Meal {
    user_id: ObjectId;
    meal_date: Date;
    food_name: string;
    portion: string;
    image: string;
    calorie: number;
    protein: number;
    carbs: number;
    fat: number;
}

const MealSchema = new Schema<Meal>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    meal_date: {
        type: Date,
        default: Date.now,
    },
    food_name: String,
    portion: String,
    image: String,
});

export const MealModel = model<Meal>("Meal", MealSchema);
