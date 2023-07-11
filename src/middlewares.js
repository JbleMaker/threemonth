import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  //session data save
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  //로그인이 되어 있지않으면 보호
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  //로그인이 되어 있으면 보호
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadAvatar = multer({
  dest: "uploads/avatars/",
  limits: {},
});

export const uploadVideo = multer({
  dest: "uploads/videos/",
  limits: {},
});
