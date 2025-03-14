import { ObjectId, Schema, model } from "mongoose";

export interface Sleep {
    sleep_date: Date,
    start_time: Date,
    end_time: Date,
    total_time: number,
    create_by: ObjectId
}

const SleepSchema = new Schema<Sleep>({
    sleep_date: Date,
    start_time: Date,
    end_time: Date,
    total_time: Number,
    create_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const SleepModel = model<Sleep>("Sleep", SleepSchema);
