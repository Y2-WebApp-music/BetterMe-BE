import { Elysia } from "elysia";
import { GoalModel } from "../../Model/Goal";
import { jwt } from '@elysiajs/jwt';

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

// display Card of goal in (tabs)/home/yourGoal
// get all goals of user
export const getUserGoals = app.get("/user/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goals = await GoalModel.find({ create_by: id });

        const goal_data = goals.map(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return {
                goal_id: goal._id.toString(),
                goal_name: goal.goal_name,
                start_date: goal.start_date,
                end_date: goal.end_date,
                total_task: goal.tasks.length,
                complete_task: completeTaskCount,
            };
        });

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



// HomeGoalCard in (tabs)/home/index
export const getTodayGoals = app.get("/today/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goals = await GoalModel.find({ create_by: id }).populate('create_by', 'firebase_uid username');
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
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return {
                goal_id: goal._id.toString(),
                goal_name: goal.goal_name,
                total_task: goal.tasks.length,
                complete_task: completeTaskCount,
                end_date: goal.end_date,
            }
        });

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



// Create goal in (tabs)/home/goal/create/[id]
export const getGoalCreate = app.get("/create/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goal = await GoalModel.findById(id).populate('create_by', 'firebase_uid username');
        if (!goal) {
            return { message: "Goal not found" };
        }

        const goal_data = {
            goal_id: goal._id.toString(),
            goal_name: goal.goal_name,
            description: goal.description,
            start_date: goal.start_date,
            end_date: goal.end_date,
            create_by: goal.create_by,
            task: goal.tasks,
            public_goal: goal.public_goal
        }

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



// Goal Card in Create goal (tabs)/home/createGoal
// get all goal in the database
export const getAllGoals = app.get("/all", async () => {
    try {
        const goal = await GoalModel.find({}).populate('create_by', 'firebase_uid username');
        if (!goal) {
            return { message: "Goal not found" };
        }

        const goal_data = goal.map(goal => {
            return {
                goal_id: goal._id.toString(),
                goal_name: goal.goal_name,
                start_date: goal.start_date,
                end_date: goal.end_date,
                create_by: goal.create_by,
                total_task: goal.tasks.length,
            }
        });

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



// get detail of goal in (tabs)/home/goal/[id]
export const getGoalDetail = app.get("/detail/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goal = await GoalModel.findById(id).populate('create_by', 'firebase_uid username');
        if (!goal) {
            return { message: "Goal not found" };
        }

        const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
        const goal_data = {
            goal_id: goal._id.toString(),
            goal_name: goal.goal_name,
            description: goal.description,
            start_date: goal.start_date,
            end_date: goal.end_date,
            create_by: goal.create_by,
            task: goal.tasks,
            public_goal: goal.public_goal,
            total_task: goal.tasks.length,
            complete_task: completeTaskCount
        }

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



export const getCompleteGoals = app.get("/complete/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goals = await GoalModel.find({ create_by: id });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const completeGoals = goals.filter(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return completeTaskCount === goal.tasks.length;
        });
        if (completeGoals.length === 0) {
            return { message: "No completed goals" };
        }

        return completeGoals;
    } catch (error) {
        console.log(error);
    }
});



export const getInProgressGoals = app.get("/in-progress/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goals = await GoalModel.find({ create_by: id });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const inProgressGoals = goals.filter(goal => {
            const today = new Date();
            const end_date = new Date(goal.end_date);
            end_date.setDate(end_date.getDate() + 1);
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return (completeTaskCount < goal.tasks.length) && (today <= end_date);
        });
        if (inProgressGoals.length === 0) {
            return { message: "No in progress goals" };
        }

        return inProgressGoals;
    } catch (error) {
        console.log(error);
    }
});



export const getFailGoals = app.get("/fail/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goals = await GoalModel.find({ create_by: id });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const failGoals = goals.filter(goal => {
            const today = new Date();
            const end_date = new Date(goal.end_date);
            end_date.setDate(end_date.getDate() + 1);
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return (completeTaskCount < goal.tasks.length) && (today > end_date);
        });
        if (failGoals.length === 0) {
            return { message: "No failed goals" };
        }

        return failGoals;
    } catch (error) {
        console.log(error);
    }
});
