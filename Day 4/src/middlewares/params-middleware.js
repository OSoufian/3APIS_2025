import mongoose from "mongoose";

import { User } from "../mongo.js";

export function isValidIDParameters() {
    return (request, response, next) => {
        if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
            response.status(400).json({ message: "Le format de l'ID n'est pas valide !" });
            return;
        } else {
            next();
        }
    };  
};

export function isAnExistingUser() {
    return async (request, response, next) => {
        const user = await User.findById(request.params.id);
        if (!user) {
            response.status(404).json({ message: "Utilisateur inexistant !" });
            return;
        } else {
            next();
        }
    };  
};
  
export const isValidID = isValidIDParameters();
export const userExists = isAnExistingUser();