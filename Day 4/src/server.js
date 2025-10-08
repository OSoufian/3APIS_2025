import express from "express";

import session from "express-session";

import usersRouter from "./routers/users-router.js";
import authenticationRouter from "./routers/authentification-router.js";

const app = express();

app.use(express.json());

app.use(session({
    secret: "secret"
}));

app.use("/users", usersRouter);
app.use("/authentification", authenticationRouter);

export default app;