import { User, UserModel } from "../../Model/User";

export interface AuthInterface {
    body: User
    jwt: any
    cookie: {
        token: any
    }
}

export const login = async (
    { body, jwt, cookie: { token } }: AuthInterface
) => {
    try {
        const { firebase_uid } = body;
        const user = await UserModel.findOne({ firebase_uid });
        if (!user) {
            return { message: "User not found" };
        }

        const payload = await jwt.sign({ UserID: user._id }, String(process.env.JWT_SECRET), { algorithm: "HS256" });
        token.set({
            httpOnly: true,
            secure: true,
            value: payload
        })

        return {
            message: "Login success",
            user,
            payload,
            token: token
        };
    } catch (error) {
        console.log(error);
    }
};
