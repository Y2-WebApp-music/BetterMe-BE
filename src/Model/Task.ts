import { ObjectId, Schema, model } from "mongoose";

export interface Task {
    task_name: string;
    status: boolean;
}

const TaskSchema = new Schema<Task>({
    task_name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
});

export const TaskModel = model<Task>('Task', TaskSchema);
