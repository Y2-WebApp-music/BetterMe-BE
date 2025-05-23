import { ObjectId, Schema, model } from "mongoose";

export interface Goal {
    goal_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    create_by: ObjectId;
    tasks: {
        task_name: string;
        status: boolean;
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    tasks: {
        type: [{
            task_name: String,
            status: Boolean,
        }],
        required: true,
    },
    public_goal: {
        type: Boolean,
        default: false,
    },
});

export const GoalModel = model<Goal>('Goal', GoalSchema);
