import Video from "../models/Video";
import Market from "../models/Market";
import Notice from "../models/Notice";
import Community from "../models/Community";
import User from "../models/User";
import Videocomment from "../models/Videocomment";

const ERROR_CODE = 404;

export const viewHome = async (req, res) => {
  //home video
  const videos = await Video.find({})
    .populate("owner")
    .sort({ createdAt: "desc" });
  const markets = await Market.find({})
    .populate("owner")
    .limit(5)
    .sort({ createdAt: "desc" });
  const notices = await Notice.find({})
    .populate("owner")
    .limit(1)
    .sort({ createdAt: "desc" });
  const communities = await Community.find({})
    .populate("owner")
    .limit(5)
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
  const video = await Video.findById(id).populate("owner").populate("comments");
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
    files: { video, thumb },
    body: { title, description, hashtags },
  } = req;

  try {
    const newVideo = await Video.create({
      title,
      fileUrl: video[0].location,
      thumbUrl: thumb[0].location,
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
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }

  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.status(200);
};

export const videoCreateComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Videocomment.create({
    text,
    name: user.name,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();

  return res.sendStatus(201);
};

export const videoDeleteComment = async (req, res) => {
  const { id, videoid } = req.body; // comment id, video id
  const { _id } = req.session.user; // user id
  const { owner } = await Videocomment.findById(id);
  const video = await Video.findById(videoid);
  if (String(owner) !== _id) return res.sendStatus(403);
  else {
    await Videocomment.findByIdAndDelete(id);
    video.comments.splice(video.comments.indexOf(videoid), 1);
    video.save();
    return res.sendStatus(200);
  }
};
