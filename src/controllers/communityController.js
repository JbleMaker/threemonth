import Community from "../models/Community";
import User from "../models/User";

const ERROR_CODE = 404;

export const communityView = async (req, res) => {
  const communities = await Community.find({}).sort({ createdAt: "desc" });
  return res.render("community/communityView", {
    pageTitle: "Community",
    communities,
  });
};

export const commuRead = async (req, res) => {
  const { id } = req.params;
  const communities = await Community.findById(id).populate("owner");
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
  const { _id } = req.session.user;
  const { title, division, contents } = req.body;
  try {
    const newCommunity = await Community.create({
      title,
      division,
      contents,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.communities.push(newCommunity._id);
    user.save();

    return res.redirect("/communityView");
  } catch (error) {
    return res.render("/community/communityUpload", {
      pageTitle: "Community Upload",
      errorMessage: error._message,
    });
  }
};

export const getCommuEdit = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id },
    },
  } = req;
  const communities = await Community.findById(id);
  if (!communities) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "There are no posts" });
  }
  if (String(communities.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("community/communityEdit", {
    pageTitle: `Edit ${communities.title}`,
    communities,
  });
};

export const postCommuEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, division, contents },
  } = req;

  const {
    session: {
      user: { _id },
    },
  } = req;

  const community = await Community.findById(id);

  if (!community) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "There are no posts" });
  }
  if (String(communities.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Community.findByIdAndUpdate(id, {
    title,
    division,
    contents,
  });
  return res.redirect("/communityView");
};

export const commuDelete = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id },
    },
  } = req;
  const communities = await Community.findById(id);
  const user = await User.findById(_id);

  if (!communities) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "There are no posts" });
  }
  if (String(communities.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Community.findByIdAndDelete(id);
  user.communities.splice(user.communities.indexOf(id), 1);
  user.save();
  return res.redirect("/communityView");
};
