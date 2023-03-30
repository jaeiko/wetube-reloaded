import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    //  heroku에 설정된 환경변수명도 무조건 AWS_ID, AWS_SECRET여야 한다!
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "wetube-juni/images",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE, // 배포 후 ios에서 동영상을 재생하고 싶을 때
});

const isHeroku = process.env.NODE_ENV === "production"; // process.env.NODE_ENV가 production이면 heroku에 있다는 뜻!

const s3VideoUploader = multerS3({
  // Streaming multer storage engine for AWS S3
  s3: s3,
  bucket: "wetube-juni/videos",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE, // 배포 후 ios에서 동영상을 재생하고 싶을 때
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/", // 아바타 사진 저장할 파일 위치
  limits: {
    fileSize: 3000000,
  },
  storage: isHeroku ? s3ImageUploader : undefined, // Heroku에 있을 때에만 multers3 stroge 사용 / heroku에 없으면 특별한 storage를 사용하지 않고 일반 폴더 storage를 사용할 것이다.
});

export const videoUpload = multer({
  dest: "uploads/videos/", // 비디오 저장할 파일 위치
  limits: {
    fileSize: 10000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined, // Heroku에 있을 때에만 multers3 stroge 사용 / heroku에 없으면 특별한 storage를 사용하지 않고 일반 폴더 storage를 사용할 것이다.
});
