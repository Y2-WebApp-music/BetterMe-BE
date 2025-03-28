import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { User, UserModel } from "../../Model/User";
import BMR_calculate from "../../utils/BMR";

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}))

export const register = app.post("/register", async ({ body, jwt, cookie: { token } }) => {
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
        } = body as User;

        const findUser = await UserModel.findOne({ firebase_uid });
        if (findUser) {
            return { message: "User already exists" };
        }

        const bmr = BMR_calculate({ birth_date, gender, weight, height, activity });

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

        token.set({
            value: await jwt.sign({
                user_id: user._id.toString(),
                username: user.username,
                email: user.email,
                profile_img: user.profile_img
            }),
            httpOnly: true,
        })

        return {
            message: "Register success",
            token: token.value,
            user,
        };
    } catch (error) {
        console.log(error);
    }
});



export const login = app.post("/login", async ({ body, jwt, cookie: { token } }) => {
    try {
        const { firebase_uid } = body as { firebase_uid: string };
        const user = await UserModel.findOne({ firebase_uid });
        if (!user) {
            return { message: "User not found" };
        }

        token.set({
            value: await jwt.sign({
                user_id: user._id.toString(),
                username: user.username,
                email: user.email,
                profile_img: user.profile_img
            }),
            httpOnly: true,
        })

        return {
            message: "Login success",
            token: token.value,
            user
        };
    } catch (error) {
        console.log(error);
    }
});



export const logout = app.post("/logout", async ({ cookie, cookie: { token } }) => {
    try {
        token.remove();
        delete cookie.token;

        return {
            message: "Logout success",
        }
    } catch (error) {
        console.log(error);
    }
});
