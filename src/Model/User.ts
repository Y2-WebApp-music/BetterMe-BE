import { Schema, model } from "mongoose";

export interface User {
    firebase_uid: string,
    email: string,
    username: string,
    birth_date: Date,
    gender: number, // 1: Male, 2: Female
    weight: number,
    height: number,
    activity: number, // 1-5
    calorie_need: number,
    profile_img: string,
    follower: string[],
    following: string[],
}

const UserSchema = new Schema<User>({
    firebase_uid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
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
    profile_img: String,
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
