import { Elysia } from "elysia";
import { Sleep, SleepModel } from "../../Model/Sleep";

const app = new Elysia();

export const updateSleep = app.put("/update/:sleep_id", async (
    { params, body }: {
        params: { sleep_id: string },
        body: Sleep
    }
) => {
    try {
        const { sleep_id } = params;
        const updateFields = body;

        const sleep = await SleepModel.findByIdAndUpdate(sleep_id, updateFields, { new: true });
        if (!sleep) {
            return { message: "Sleep not found" };
        }

        return {
            message: "Update sleep success",
            sleep
        };
    } catch (error) {
        console.log(error);
    }
});