import { ObjectId, Schema, model } from "mongoose";

export interface Meal {
    create_by: ObjectId;
    meal_date: Date;
    food_name: string;
    image_url: string;
    portion: string;
    calorie: number;
    protein: number;
    carbs: number;
    fat: number;
    createByAI: boolean;
}

const MealSchema = new Schema<Meal>({
    create_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    meal_date: Date,
    food_name: String,
    image_url: String,
    portion: String,
    calorie: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    createByAI: Boolean
});

export const MealModel = model<Meal>("Meal", MealSchema);
