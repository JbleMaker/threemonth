import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  //session data save
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  // console.log(typeof res.locals.loggedInUser.name);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  //로그인이 되어 있지않으면 보호
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "로그인 후 이용해주세요.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  //로그인이 되어 있으면 보호
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "로그인이 되어 있습니다.");
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
