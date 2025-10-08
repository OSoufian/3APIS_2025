function isValidUser(authorizedValue, userValue) {
  if (userValue === authorizedValue)
    return true;
  else
    return false;
}

export function isValidAdminOrEmployee() {
  return (request, response, next) => {
    if (isValidUser("admin", request.session.userRole) || isValidUser("employee", request.session.userRole))
      next();
    else 
      response.status(401).json({ message: "Vous n'avez pas les autorisations nécessaires pour effectuer cette action !" });
  };  
}

export function isValidAdmin() {
  return (request, response, next) => {
    if (isValidUser("admin", request.session.userRole))
      next();
    else 
      response.status(401).json({ message: "Vous n'avez pas les autorisations nécessaires pour effectuer cette action !" });
  };  
}

function isLogged(id) {
  if (!id) 
    return false;
  else
    return true;    
}

export function getCurrentUser() {
  return (request, response, next) => {
    if (!isLogged(request.session.userID)) {
      response.status(401).json({ message: "Aucun utilisateur connecté !" });
      return;
    } else {
      next();
    }
  };  
}

export function isValidAdminOrCurrentUser() {
  return (request, response, next) => {
    if (isValidUser("admin", request.session.userRole) || isLogged(request.session.userID))
      next();
    else 
      response.status(401).json({ message: "Vous n'avez pas les autorisations nécessaires pour effectuer cette action !" });
  }; 
}

export const isAdminOrEmployee = isValidAdminOrEmployee();
export const isAdmin = isValidAdmin();
export const isCurrentUser = getCurrentUser();
export const isAdminOrCurrentUser = isValidAdminOrCurrentUser();