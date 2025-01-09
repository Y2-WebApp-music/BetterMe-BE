import { User, UserModel } from "../../Model/User";
import { BMR_calculate } from "../../utils/BMR";

export const register = async ({ body }: { body: User }) => {
    try {
        const {
            firebase_uid,
            email,
            username,
            birth_date,
            gender,
            weight,
            height,
            activity,
            profile_img,
        } = body;

        const findUser = await UserModel.findOne({ firebase_uid });
        if (findUser) {
            return { message: "User already exists" };
        }

        const bmr = BMR_calculate(birth_date, gender, weight, height, activity);

        const user = new UserModel({
            firebase_uid,
            email,
            username,
            birth_date,
            gender,
            weight,
            height,
            activity,
            calorie_need: bmr,
            profile_img,
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
