import { ObjectId, Schema, model } from "mongoose";

export interface Goal {
    goal_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    create_by: string; // firebase_uid
    tasks: {
        task_name: string;
        status: number; // 0: incomplete, 1: complete
    }[];
    public_goal: boolean;
}

const GoalSchema = new Schema<Goal>({
    goal_name: {
        type: String,
        required: true,
    },
    description: String,
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    create_by: {
        type: String,
        ref: 'User',
        default: "System",
    },
    tasks: {
        type: [{
            task_name: String,
            status: Number,
        }],
        required: true,
    },
    public_goal: {
        type: Boolean,
        default: false,
    },
});

export const GoalModel = model<Goal>('Goal', GoalSchema);
