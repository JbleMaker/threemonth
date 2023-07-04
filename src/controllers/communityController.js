import Community from "../models/Community";

export const communityView = async (req, res) => {
  const communities = await Community.find({});
  return res.render("community/communityView", {
    pageTitle: "Community",
    communities,
  });
};

export const commuRead = async (req, res) => {
  const { id } = req.params;
  const communities = await Community.findById(id);
  return res.render("community/communityRead", {
    pageTitle: "Community",
    communities,
  });
};

export const getCommuUpload = (req, res) => {
  return res.render("community/communityUpload", {
    pageTitle: "Community Upload",
  });
};

export const postCommuUpload = async (req, res) => {
  const { title, division, contents } = req.body;
  try {
    await Community.create({
      title,
      division,
      contents,
    });
    return res.redirect("/communityView");
  } catch (error) {
    return res.render("/community/communityUpload", {
      pageTitle: "Community Upload",
      errorMessage: error._message,
    });
  }
};

export const commuEdit = (req, res) => {
  return res.send("Edit Board");
};

export const commuDelete = (req, res) => {
  return res.send("Delete Board");
};
