import { Elysia } from "elysia";
import mongoose from "mongoose";
import { PORT, MONGO_URI } from "./config/env";

const app = new Elysia();

app.get("/", () => "Hello Elysia");

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`🦊 Elysia is running at http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});