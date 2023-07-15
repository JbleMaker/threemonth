import Market from "../models/Market";
import Marketcomment from "../models/Marketcomment";
import User from "../models/User";

const ERROR_CODE = 404;

export const marketView = async (req, res) => {
  const markets = await Market.find({})
    .populate("owner")
    .sort({ createdAt: "desc" });
  return res.render("market/marketView", { pageTitle: "Market", markets });
};

export const marketRead = async (req, res) => {
  const { id } = req.params;
  const market = await Market.findById(id)
    .populate("owner")
    .populate("comments");
  // console.log(market);
  return res.render("market/marketRead", {
    pageTitle: "Market",
    market,
  });
};

export const getMarketUpload = (req, res) => {
  return res.render("market/marketUpload", { pageTitle: "Market Upload" });
};

export const postMarketUpload = async (req, res) => {
  const { _id } = req.session.user;
  const { title, division, price, zone, contents } = req.body;
  try {
    const newMarket = await Market.create({
      title,
      division,
      price,
      zone,
      contents,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.markets.push(newMarket._id);
    user.save();

    return res.redirect("/marketView");
  } catch (error) {
    return res.render("market/marketUpload", {
      pageTitle: "Market Upload",
      errorMessage: error._message,
    });
  }
};

export const getMarketEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const market = await Market.findById(id);

  if (!market) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "No posts found." });
  }
  if (String(market.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  return res.render("market/marketEdit", {
    pageTitle: `Edit ${market.title}`,
    market,
  });
};

export const postMarketEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
    body: { title, division, price, zone, contents },
  } = req;

  const market = await Market.findById(id);

  if (!market) {
    return res.render("404", { pageTitle: "No posts found." });
  }

  if (String(market.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  await Market.findByIdAndUpdate(id, {
    title,
    division,
    price,
    zone,
    contents,
  });
  return res.redirect("/marketView");
};

export const marketDelete = async (req, res) => {
  const { id } = req.params;
  const {
    session: {
      user: { _id },
    },
  } = req;
  const market = await Market.findById(id);
  const user = await User.findById(_id);

  if (!market) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "No posts found." });
  }
  if (String(market.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Market.findByIdAndDelete(id);
  user.markets.splice(user.markets.indexOf(id), 1);
  user.save();
  return res.redirect("/marketView");
};

export const marketRegisterView = async (req, res) => {
  const { id } = req.params;
  const market = await Market.findById(id);
  if (!market) {
    return res.status(404);
  }
  market.meta.views = market.meta.views + 1;
  await market.save();
  return res.status(200);
};

export const marketCreateComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req;

  const market = await Market.findById(id).populate("owner");

  if (!market) {
    return res.sendStatus(404);
  }

  const comment = await Marketcomment.create({
    text,
    name: user.name,
    owner: user._id,
    market: id,
  });

  market.comments.push(comment._id);
  market.save();

  return res.sendStatus(201);
};

export const marketDeleteComment = async (req, res) => {
  const { id, marketid } = req.body; // comment id, video id
  const { _id } = req.session.user; // user id

  const { owner } = await Marketcomment.findById(id);
  const market = await Market.findById(marketid);
  // console.log(market);

  if (String(owner) !== _id) return res.sendStatus(403);
  else {
    await Marketcomment.findByIdAndDelete(id);
    market.comments.splice(market.comments.indexOf(marketid), 1);
    market.save();
    return res.sendStatus(200);
  }
};
