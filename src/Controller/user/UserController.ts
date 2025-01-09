import { UserModel } from "../../Model/User";
import { AuthInterface } from "./LoginController";

// home screen
export const getUserById = async ({ params }: { params: { uid: string } }) => {
    try {
        const { uid } = params;
        const user = await UserModel.findOne({ firebase_uid: uid });
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

export const getProfile = async ({ jwt, cookie: { token } }: AuthInterface) => {
    try {
        const validToken = await jwt.verify(token.value, String(process.env.JWT_SECRET));
        if (!validToken) {
            return { message: "Invalid token" };
        }

        const userID = validToken.UserID;
        const user = await UserModel.findById(userID);
        if (!user) {
            return { message: "User not found" };
        }

        // convert object to json
        const user_data = {
            _id: user._id,
            firebase_uid: user.firebase_uid,
            email: user.email,
            username: user.username,
            birth_date: user.birth_date,
            gender: user.gender,
            weight: user.weight,
            height: user.height,
            activity: user.activity,
            calorie_need: user.calorie_need,
            follower: user.follower,
            following: user.following,
        };

        return user_data;
    } catch (error) {
        console.log(error);
    }
};
