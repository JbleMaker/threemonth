const videos = [];

export const videoView = (req, res) => {
  return res.render("videoView", { pageTitle: "Video" }, videos);
};

export const getVideoEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("videoEdit", { pageTitle: `Editing ${video.id}` });
};

export const postVideoEdit = (req, res) => {
  return res.redirect("/");
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const getVideoUpload = (req, res) => {
  return res.render("videos/videoUpload", { pageTitle: "Upload Video" });
};

export const postVideoUpload = (req, res) => {
  const newVideo = {
    title: req.body.title,
    rating: 0,
    comments: 0,
    id: 1,
  };
  return res.redirect("/");
};

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const videoDelete = (req, res) => {
  return res.send("deleteVideo");
};
