import express from "express";
import bcrypt from "bcrypt";

import { User } from "../mongo.js";
import { isAdmin, isAdminOrEmployee } from "../middlewares/authentication-middleware.js";
import { isValidID, userExists } from "../middlewares/params-middleware.js";

const router = express.Router();

router.get("/", isAdminOrEmployee, async (request, response) => {
  const users = await User.find();
  response.status(200).json(users);
});

router.get("/:id", isAdminOrEmployee, isValidID, userExists, async (request, response) => {
  const user = await User.findById(request.params.id);
  response.status(200).json(user);
});

router.put("/:id", isAdmin, isValidID, userExists, async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id);
  const newEmailUser = await User.findOne({ email: request.body.email});

  if (newEmailUser !== null && request.body.email !== user.email) {
    response.status(409).json({ message: "Email déjà existant, veuillez utiliser une autre adresse !" });
    return;
  }
  
  bcrypt.hash(request.body.password, 10, async (error, hash) => {
    if (error) response.status(500).json(error);
    else {
      const user = await User.findByIdAndUpdate(
        id,
        { ...request.body, password: hash },
        { new: true }
      );
      if (!user) {
        response.status(404).json({ message: "Utilisateur inexistant !" });
        return;
      }
      response.status(200).json({ message:`L'utilisateur ${id} a été modifié avec succès !` , user});
    }
  });
});

router.delete("/:id", isAdmin, isValidID, userExists, async (request, response) => {
  const id = request.params.id;
  const user = await User.findByIdAndDelete(id);

  response.status(200).json({ message: `L'utilisateur ${id} a été supprimé avec succès !`, user });
});

export default router;