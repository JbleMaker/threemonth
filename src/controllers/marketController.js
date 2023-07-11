import Market from "../models/Market";
import User from "../models/User";

const ERROR_CODE = 404;

export const marketView = async (req, res) => {
  const markets = await Market.find({}).sort({ createdAt: "desc" });
  return res.render("market/marketView", { pageTitle: "Market", markets });
};

export const marketRead = async (req, res) => {
  const { id } = req.params;
  const market = await Market.findById(id).populate("owner");
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
