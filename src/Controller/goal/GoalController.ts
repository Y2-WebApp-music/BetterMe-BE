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

        if (!tasks) {
            return { message: "At least 1 task is required to create a goal" };
        }

        const taskStatus = tasks.map(task => ({
            ...task,
            status: task.status || 0
        }));

        const goal = new GoalModel({
            goal_name,
            description,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            create_by: create_by || "System",
            tasks: taskStatus,
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
};

export const getTodayGoal = async ({ params }: { params: { uid: string } }) => {
    try {
        const { uid } = params;
        const goals = await GoalModel.find({ create_by: uid });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const today = new Date();
        const todayGoals = goals.filter(goal => {
            const startDate = new Date(goal.start_date);
            const endDate = new Date(goal.end_date);
            return today >= startDate && today <= endDate;
        });
        if (todayGoals.length === 0) {
            return { message: "No goals for today" };
        }

        const goal_data = todayGoals.map(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === 1).length;
            return {
                goal_id: goal._id.toString(),
                goal_name: goal.goal_name,
                description: goal.description,
                start_date: goal.start_date,
                end_date: goal.end_date,
                create_by: goal.create_by,
                total_task: goal.tasks.length,
                complete_task: completeTaskCount,
            };
        });

        return goal_data;
    } catch (error) {
        console.log(error);
    }
};

export const updatePublicGoal = async (
    { params, body }: {
        params: { goal_id: string },
        body: { public_goal: boolean }
    }
) => {
    try {
        const { goal_id } = params;
        const { public_goal } = body;

        const goal = await GoalModel.findByIdAndUpdate(goal_id, { public_goal }, { new: true });
        if (!goal) {
            return { message: "Goal not found" };
        }

        return {
            message: "Update public goal status success",
            goal: goal.goal_name,
            public_goal: goal.public_goal,
        };
    } catch (error) {
        console.log(error);
    }
};

export const getAllGoal = () => {
    try {
        const goals = GoalModel.find({});
        return goals;
    } catch (error) {
        console.log(error);
    }
};

export const getCompleteGoal = async ({ params }: { params: { uid: string } }) => {
    try {
        const { uid } = params;
        const goals = await GoalModel.find({ create_by: uid });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const completeGoals = goals.filter(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === 1).length;
            return completeTaskCount === goal.tasks.length;
        });
        if (completeGoals.length === 0) {
            return { message: "No completed goals" };
        }

        return completeGoals;
    } catch (error) {
        console.log(error);
    }
};

export const getInProgressGoal = async ({ params }: { params: { uid: string } }) => {
    try {
        const { uid } = params;
        const goals = await GoalModel.find({ create_by: uid });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const inProgressGoals = goals.filter(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === 1).length;
            return (completeTaskCount > 0) && (completeTaskCount < goal.tasks.length);
        });
        if (inProgressGoals.length === 0) {
            return { message: "No in progress goals" };
        }

        return inProgressGoals;
    } catch (error) {
        console.log(error);
    }
};

export const getFailGoal = async ({ params }: { params: { uid: string } }) => {
    try {
        const { uid } = params;
        const goals = await GoalModel.find({ create_by: uid });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const failGoals = goals.filter(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === 1).length;
            return (completeTaskCount < goal.tasks.length) && (new Date() > new Date(goal.end_date));
        });
        if (failGoals.length === 0) {
            return { message: "No failed goals" };
        }

        return failGoals;
    } catch (error) {
        console.log(error);
    }
};
