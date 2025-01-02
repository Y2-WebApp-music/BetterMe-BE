import { ObjectId, Schema, model } from "mongoose";

export interface Goal {
    goal_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    create_by: ObjectId;
    task_id: ObjectId[];
}

const GoalSchema = new Schema<Goal>({
    goal_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
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
    },
    task_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
});

export const GoalModel = model<Goal>('Goal', GoalSchema);
