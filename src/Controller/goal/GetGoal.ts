import { Elysia, t } from "elysia";
import { Goal, GoalModel } from "../../Model/Goal";
import { jwt } from '@elysiajs/jwt';
import { User } from '../../Model/User';

interface Body {
    body: {
        uid: string;
    }
}

const app = new Elysia().use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
}));

// display Card of goal in (tabs)/home/yourGoal
export const getAllGoal = app.get("/all", async () => {
    try {
        const goals = await GoalModel.find({});

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
        })

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



// HomeGoalCard in (tabs)/home/index
export const getTodayGoal = app.get("/today/:id", async ({ params }) => {
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
        const goal = await GoalModel.findById(id).populate('create_by', 'username');
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
export const getGoalCard = app.get("/card/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goal = await GoalModel.findById(id).populate('create_by', 'username');
        if (!goal) {
            return { message: "Goal not found" };
        }

        const goal_data = {
            goal_id: goal._id.toString(),
            goal_name: goal.goal_name,
            start_date: goal.start_date,
            end_date: goal.end_date,
            create_by: goal.create_by,
            total_task: goal.tasks.length
        }

        return goal_data;
    } catch (error) {
        console.log(error);
    }
});



// get detail of goal in (tabs)/home/goal/[id]
export const getGoalDetail = app.get("/detail/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goal = await GoalModel.findById(id).populate('create_by', 'username');
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



export const getCompleteGoal = app.get("/complete/:id", async ({ params }) => {
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



export const getInProgressGoal = app.get("/in-progress/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goals = await GoalModel.find({ create_by: id });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const inProgressGoals = goals.filter(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return (completeTaskCount > 0) && (completeTaskCount < goal.tasks.length);
        });
        if (inProgressGoals.length === 0) {
            return { message: "No in progress goals" };
        }

        return inProgressGoals;
    } catch (error) {
        console.log(error);
    }
});



export const getFailGoal = app.get("/fail/:id", async ({ params }) => {
    try {
        const { id } = params;
        const goals = await GoalModel.find({ create_by: id });
        if (!goals) {
            return { message: "Goal not found" };
        }

        const failGoals = goals.filter(goal => {
            const completeTaskCount = goal.tasks.filter(task => task.status === true).length;
            return (completeTaskCount < goal.tasks.length) && (new Date() > new Date(goal.end_date));
        });
        if (failGoals.length === 0) {
            return { message: "No failed goals" };
        }

        return failGoals;
    } catch (error) {
        console.log(error);
    }
});
