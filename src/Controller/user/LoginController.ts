import { User, UserModel } from "../../Model/User";

export const login = async ({ body }: { body: User }) => {
    try {
        const { firebase_uid } = body;
        const user = await UserModel.findOne({ firebase_uid });
        if (!user) {
            return { message: "User not found" };
        }
        return {
            message: "Login success",
            user,
        };
    } catch (error) {
        console.log(error); 
    }
};
