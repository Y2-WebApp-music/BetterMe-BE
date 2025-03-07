import { Elysia } from "elysia";
import { User, UserModel } from "../../Model/User";
import BMR_calculate from "../../utils/BMR";
import { GoalModel } from "../../Model/Goal";
import { PostModel } from "../../Model/Community";

const app = new Elysia();

export const getUserById = app.get("/profile/:id", async ({ params }) => {
    try {
        const { id } = params;
        const user = await UserModel.findById(id);
        if (!user) {
            return { message: "User not found" };
        }

        const goalCount = await GoalModel.countDocuments({ create_by: id });
        const postCount = await PostModel.countDocuments({ create_by: id });

        const user_data = {
            _id: user._id,
            username: user.username,
            profile_img: user.profile_img,
            email: user.email,
            goal: goalCount,
            post: postCount
        }

        return user_data;
    } catch (error) {
        console.log(error);
    }
});



export const updateUser = app.put("/update/:id", async (
    { params, body }: {
        params: { id: string },
        body: User
    }
) => {
    try {
        const { id } = params;
        const updateFields = body;

        const user = await UserModel.findById(id);
        if (!user) {
            return { message: "User not found" };
        }

        if (updateFields.birth_date || updateFields.gender || updateFields.weight || updateFields.height || updateFields.activity) {
            const birth_date = updateFields.birth_date || user.birth_date;
            const gender = updateFields.gender || user.gender;
            const weight = updateFields.weight || user.weight;
            const height = updateFields.height || user.height;
            const activity = updateFields.activity || user.activity;

            const calorie_need = BMR_calculate({ birth_date, gender, weight, height, activity });
            updateFields.calorie_need = calorie_need;
        }

        Object.assign(user, updateFields);
        await user.save();

        return {
            message: "Update user success",
            user
        };
    } catch (error) {
        console.log(error);
    }
});



export const getFollow = app.get("/follow/:id", async ({ params }) => {
    try {
        const { id } = params;

        const user = await UserModel.findById(id);
        if (!user) {
            return { message: "User not found" };
        }

        const user_data = {
            follower: user.follower,
            following: user.following
        }

        return user_data;
    } catch (error) {
        console.log(error);
    }
});
