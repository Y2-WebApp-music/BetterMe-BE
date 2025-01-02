import { ObjectId, Schema, model } from "mongoose";

export interface Task {
    task_name: string;
    status: number; // 0: Unchecked, 1: Checked
}

const TaskSchema = new Schema<Task>({
    task_name: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
});

export const TaskModel = model<Task>('Task', TaskSchema);
