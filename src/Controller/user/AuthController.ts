import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { User, UserModel } from "../../Model/User";
import { BMR_calculate } from "../../utils/BMR";

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}))

export const register = app.post("/register", async ({ body }: { body: User }) => {
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
});



export const login = app.post("/login", async ({ body, jwt, cookie: { token }, params }) => {
    try {
        const { firebase_uid } = body as { firebase_uid: string };
        const user = await UserModel.findOne({ firebase_uid });
        if (!user) {
            return { message: "User not found" };
        }

        token.set({
            value: await jwt.sign({ user_id: user._id.toString() }),
            httpOnly: true,
        })

        return {
            message: "Login success",
            user,
            token: token.value
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
