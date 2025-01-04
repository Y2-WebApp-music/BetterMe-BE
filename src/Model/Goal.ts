import { ObjectId, Schema, model } from "mongoose";

export interface Goal {
    goal_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    create_by: string; // firebase_uid
    tasks: {
        task_name: string;
        status: number;
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
    },
    tasks: [{
        task_name: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            default: 0,
        },
    }],
    public_goal: {
        type: Boolean,
        default: false,
    },
});

export const GoalModel = model<Goal>('Goal', GoalSchema);
