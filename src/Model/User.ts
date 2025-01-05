import { Schema, model } from "mongoose";

export interface User {
    firebase_uid: string,
    birth_date: Date,
    gender: number, // 1: Male, 2: Female
    weight: number,
    height: number,
    activity: number, // 1-5
    calorie_need: number,
    follower: string[],
    following: string[],
}

const UserSchema = new Schema<User>({
    firebase_uid: {
        type: String,
        unique: true,
    },
    birth_date: Date,
    gender: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    activity: Number,
    calorie_need: Number,
    follower: [{
        type: String,
        ref: 'User',
    }],
    following: [{
        type: String,
        ref: 'User',
    }],
});

export const UserModel = model<User>('User', UserSchema);
