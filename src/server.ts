import { Elysia } from "elysia";
import mongoose from "mongoose";
import { cors } from '@elysiajs/cors'
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import userRoute from "./Routes/userRoute";
import goalRoute from "./Routes/goalRoute";
import mealRoute from "./Routes/mealRoute";
import calendarRoute from "./Routes/calendarRoute";
import menuRoute from "./Routes/menuRoute";
import communityRoute from "./Routes/communityRoute";
import sleepRoute from "./Routes/sleepRoute";

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = String(process.env.MONGO_URI);

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(cors())
  .use(jwt({
    name: "jwt",
    secret: String(process.env.JWT_SECRET),
    exp: "1d",
  }))
  .use(cookie());

// API routes
app.use(userRoute);
app.use(goalRoute);
app.use(mealRoute);
app.use(calendarRoute);
app.use(menuRoute);
app.use(communityRoute);
app.use(sleepRoute);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`🦊 Elysia is running at http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});