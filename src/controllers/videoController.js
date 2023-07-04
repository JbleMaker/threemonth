import Video from "../models/Video";
import Market from "../models/Market";
import Notice from "../models/Notice";
import Community from "../models/Community";

export const viewHome = async (req, res) => {
  //home video
  const videos = await Video.find({}).limit(6);
  const markets = await Market.find({}).limit(6);
  const notices = await Notice.find({}).limit(4);
  const communities = await Community.find({}).limit(6);
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
  const video = await Video.findById(id);
  // console.log(video);
  return res.render("videos/videoView", { pageTitle: "Video", video });
};

export const getVideoEdit = (req, res) => {
  const { id } = req.params;
  return res.render("videoEdit", { pageTitle: `Editing` });
};

export const postVideoEdit = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  return res.redirect(`/videos/${id}`);
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const getVideoUpload = (req, res) => {
  return res.render("videos/videoUpload", { pageTitle: "Upload Video" });
};

export const postVideoUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    // console.log(error);
    return res.render("videos/videoUpload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const videoDelete = (req, res) => {
  return res.send("deleteVideo");
};
