import { User, UserModel } from "../../Model/User";

export const register = async ({ body }: { body: User }) => {
    try {
        const {
            firebase_uid,
            birth_date,
            gender,
            weight,
            height,
            activity,
        } = body;

        const user = new UserModel({
            firebase_uid,
            birth_date,
            gender,
            weight,
            height,
            activity,
        });
        await user.save();

        return {
            message: "Register success",
            user,
        };
    } catch (error) {
        console.log(error);
    }
};
