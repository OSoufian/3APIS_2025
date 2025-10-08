import express from "express";

import { User } from "../mongo.js";
import { isCurrentUser } from "../middlewares/authentication-middleware.js";

const router = express.Router();

router.get("/", isCurrentUser, async (request, response) => {
  const user = await User.findById(request.session.userID);
  response.status(200).json(user);
});

router.get("/logout", isCurrentUser, async (request, response) => {
  request.session.destroy();
  response.status(200).json({message: "Vous avez été déconnecté avec succcès !" });
});

export default router;