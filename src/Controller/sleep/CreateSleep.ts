import { Elysia } from "elysia";
import { Sleep, SleepModel } from "../../Model/Sleep";

const app = new Elysia();

const weekRange = (date: string) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
}

export const createSleep = app.post("/create", async ({ body }: { body: Sleep }) => {
    try {
        const {
            sleep_date,
            start_time,
            end_time,
            total_time,
            create_by,
        } = body;

        const sleep = new SleepModel({
            sleep_date,
            start_time,
            end_time,
            total_time,
            create_by,
        });
        await sleep.save();

        return {
            message: "Create sleep success",
            sleep
        };
    } catch (error) {
        console.log(error);
    }
});
