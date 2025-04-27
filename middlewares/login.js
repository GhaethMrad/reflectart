export const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/login");
  }
};

export const redirectIfAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};