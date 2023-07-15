import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-northeast-2",
  // region error solve
  //region은 aws->s3->bucket 에 적혀있음
  credentials: {
    apiVersion: "2023-07-15",
    //날짜는 aws->IAM->user->user click 시 생성날짜 존재
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const imageUplaoder = multerS3({
  s3: s3,
  bucket: "threemonth/images",
  Condition: {
    StringEquals: {
      "s3:x-amz-acl": ["public-read"],
    },
  },
});

const videoUplaoder = multerS3({
  s3: s3,
  bucket: "threemonth/videos",
  Condition: {
    StringEquals: {
      "s3:x-amz-acl": ["public-read"],
    },
  },
});

export const localsMiddleware = (req, res, next) => {
  //session data save
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  // res.locals.moment = require('moment');
  //npm i moment
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
  storage: imageUplaoder,
});

export const uploadVideo = multer({
  dest: "uploads/videos/",
  limits: {},
  storage: videoUplaoder,
});
