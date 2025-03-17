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

//  get total sleep time in a week
export const getTotalSleepTime = app.get("/total-time", async ({ query }) => {
    try {
        const { date, id } = query;

        const { start, end } = weekRange(date as string);
        const sleeps = await SleepModel.find({
            sleep_date: { $gte: start, $lte: end },
            create_by: id
        });
        if (!sleeps || sleeps.length === 0) {
            return { message: "No sleep found" };
        }

        const summary: Record<string, any> = {};

        sleeps.forEach((sleep) => {
            const sleepDate = sleep.sleep_date.toISOString().split("T")[0];
            if (!summary[sleepDate]) {
                summary[sleepDate] = {
                    date: sleepDate,
                    total_time: 0,
                };
            }

            summary[sleepDate].total_time += sleep.total_time;
        });

        return Object.values(summary); // Remove date keys
    } catch (error) {
        console.log(error);
    }
});



// get weekly sleep data
export const getWeeklySleep = app.get("/weekly", async ({ query }) => {
    try {
        const { date, id } = query;

        const { start, end } = weekRange(date as string);
        const sleeps = await SleepModel.find({
            sleep_date: { $gte: start, $lte: end },
            create_by: id
        }).populate("create_by", "username profile_img");
        if (!sleeps || sleeps.length === 0) {
            return { message: "No sleep found" };
        }

        const summary: Record<string, any> = {};

        sleeps.forEach((sleep) => {
            const sleepDate = sleep.sleep_date.toISOString().split("T")[0];
            if (!summary[sleepDate]) {
                summary[sleepDate] = {
                    date: sleepDate,
                    total_time: 0,
                    sleep: [],
                };
            }

            summary[sleepDate].total_time += sleep.total_time;

            summary[sleepDate].sleep.push({
                sleep_id: sleep._id.toString(),
                sleep_date: sleep.sleep_date,
                start_time: sleep.start_time,
                end_time: sleep.end_time,
                total_time: sleep.total_time,
                create_by: sleep.create_by
            });
        });

        return Object.values(summary); // Remove date keys
    } catch (error) {
        console.log(error);
    }
});



export const getSleepData = app.get("/data", async ({ query }) => {
    try {
        const { date, id } = query;

        const { start, end } = weekRange(date as string);
        const sleeps = await SleepModel.find({
            sleep_date: { $gte: start, $lte: end },
            create_by: id
        });
        if (!sleeps || sleeps.length === 0) {
            return { message: "No sleep found" };
        }

        return sleeps;
    } catch (error) {
        console.log(error);
    }
});
