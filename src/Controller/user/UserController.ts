import { Elysia } from "elysia";
import { User, UserModel } from "../../Model/User";
import BMR_calculate from "../../utils/BMR";

const app = new Elysia();

export const getUserById = app.get("/profile/:uid", async ({ params }) => {
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
