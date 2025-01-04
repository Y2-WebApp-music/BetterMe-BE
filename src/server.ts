import { Elysia } from "elysia";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config/env";
import { cors } from '@elysiajs/cors'
import userRoute from "./Routes/userRoute";
import goalRoute from "./Routes/goalRoute";

const app = new Elysia();
app.get("/", () => "Hello Elysia");

app.use(cors({
  origin: "localhost:8081",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

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