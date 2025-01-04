import { Goal, GoalModel } from "../../Model/Goal";

export const createGoal = async ({ body }: { body: Goal }) => {
    try {
        const {
            goal_name,
            description,
            start_date,
            end_date,
            create_by,
            tasks,
            public_goal,
        } = body;

        const goal = new GoalModel({
            goal_name,
            description,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            create_by,
            tasks: tasks || [],
            public_goal: public_goal || false,
        });
        await goal.save();

        return {
            message: "Create goal success",
            goal,
        };     
    } catch (error) {
        console.log(error);
    }
}
