import Community from "../models/Community";
import Communitycomment from "../models/Communitycomment";
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
  const communities = await Community.findById(id)
    .populate("owner")
    .populate("comments");
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

  const communities = await Community.findById(id);

  if (!communities) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "There are no posts" });
  }
  if (String(communities.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await communities.findByIdAndUpdate(id, {
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

export const commuRegisterView = async (req, res) => {
  const { id } = req.params;
  const communities = await Community.findById(id);
  if (!communities) {
    return res.status(404);
  }
  communities.meta.views = communities.meta.views + 1;
  await communities.save();
  return res.status(200);
};

export const communityCreateComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req;

  const community = await Community.findById(id).populate("owner");

  if (!community) {
    return res.sendStatus(404);
  }

  const comment = await Communitycomment.create({
    text,
    name: user.name,
    owner: user._id,
    community: id,
  });

  community.comments.push(comment._id);
  community.save();

  return res.sendStatus(201);
};

export const communityDeleteComment = async (req, res) => {
  const { id, communityid } = req.body; // comment id, video id
  const { _id } = req.session.user; // user id

  const { owner } = await Communitycomment.findById(id);
  const community = await Community.findById(communityid);
  console.log(community);
  if (String(owner) !== _id) return res.sendStatus(403);
  else {
    await Communitycomment.findByIdAndDelete(id);
    community.comments.splice(community.comments.indexOf(communityid), 1);
    community.save();
    return res.sendStatus(200);
  }
};
