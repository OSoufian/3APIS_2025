import express from "express";

import usersRouter from "./routers/users-router.js";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);

export default app;