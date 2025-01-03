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

        const age = new Date().getFullYear() - new Date(birth_date).getFullYear();
        var bmr = 10 * weight + 6.25 * height - 5 * age - 161;

        switch (activity) {
            case 1:
                bmr *= 1.2;
                break;
            case 2:
                bmr *= 1.375;
                break;
            case 3:
                bmr *= 1.55;
                break;
            case 4:
                bmr *= 1.725;
                break;
            case 5:
                bmr *= 1.9;
                break;
            default:
                bmr *= 1.2;
                break;
        }

        const user = new UserModel({
            firebase_uid,
            birth_date,
            gender,
            weight,
            height,
            activity,
            calorie_need: bmr,
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
