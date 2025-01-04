import { UserModel } from "../../Model/User";

// home screen
export const getUserById = async ({ params }: { params: { id: string }}) => {
    try {
        const { id } = params;
        const user = await UserModel.findOne({ firebase_uid: id });
        if (!user) {
            return { message: "User not found" };
        }
        
        const user_data = {
            birth_date: user.birth_date,
            gender: user.gender,
            weight: user.weight,
            height: user.height,
            activity: user.activity,
            calorie_need: user.calorie_need,
        }

        return user_data;
    } catch (error) {
        console.log(error);
    }
};
