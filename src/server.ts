import { Elysia } from "elysia";
import mongoose from "mongoose";
import { cors } from '@elysiajs/cors'
import userRoute from "./Routes/userRoute";
import goalRoute from "./Routes/goalRoute";

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = String(process.env.MONGO_URI);

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(cors())

// API routes
app.use(userRoute);
app.use(goalRoute);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`🦊 Elysia is running at http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});