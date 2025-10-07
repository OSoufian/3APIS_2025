import express from "express";

import { User } from "../mongo.js";

const router = express.Router();

router.get("/", async (request, response) => {
  const users = await User.find();
  response.status(200).json(users);
});

router.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  response.status(200).json(user);
});

router.post('/', (request, response) => {
    const newUser = User({ ...request.body });
    newUser.save()
    .then(
        user => {
            response.status(200).json({ message: `Bienvenue ${user.username}, ton compte a été créé avec succès. Tu peux te connecter !`, id: newUser._id })
        }
    )
});

export default router;