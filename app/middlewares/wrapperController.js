// Ce middleware est un wrapper pour les contrôleurs async
// Il attrape les erreurs et les passe au middleware d'erreur pour un traitement  centralisé
module.exports = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};
