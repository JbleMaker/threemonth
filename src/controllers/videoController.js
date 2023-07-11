import Video from "../models/Video";
import Market from "../models/Market";
import Notice from "../models/Notice";
import Community from "../models/Community";
import User from "../models/User";

const ERROR_CODE = 404;

export const viewHome = async (req, res) => {
  //home video
  const videos = await Video.find({}).limit(6).sort({ createdAt: "desc" });
  const markets = await Market.find({}).limit(6).sort({ createdAt: "desc" });
  const notices = await Notice.find({}).limit(1).sort({ createdAt: "desc" });
  const communities = await Community.find({})
    .limit(6)
    .sort({ createdAt: "desc" })
    .limit(6)
    .sort({ createdAt: "desc" });
  return res.render("home", {
    pageTitle: "Home",
    videos,
    markets,
    notices,
    communities,
  });
};

export const videoView = async (req, res) => {
  //watch
  const { id } = req.params;
  // console.log(id);
  const video = await Video.findById(id).populate("owner");
  // console.log(video._id.toString());

  if (!video) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "Video Not Found." });
  }
  return res.render("videos/videoView", { pageTitle: "Video", video });
};

export const getVideoEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "Video Not Found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  return res.render("videos/videoEdit", {
    pageTitle: `Edit ${video.title}`,
    video,
  });
};

export const postVideoEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "Video Not Found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const getVideoUpload = (req, res) => {
  return res.render("videos/videoUpload", { pageTitle: "Upload Video" });
};

export const postVideoUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    file: { path },
    body: { title, description, hashtags },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      fileUrl: `/${path}`,
      owner: _id,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    // console.log(error);
    return res.status(400).render("videos/videoUpload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const videoDelete = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "Video Not Found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

export const videoSearch = async (req, res) => {
  const { keyword } = req.query;

  return res.render("search", { pageTitle: "Search" });
};
