import Market from "../models/Market";

export const marketView = async (req, res) => {
  const markets = await Market.find({});
  return res.render("market/marketView", { pageTitle: "Market", markets });
};

export const marketRead = async (req, res) => {
  const { id } = req.params;
  const market = await Market.findById(id);
  return res.render("market/marketRead", {
    pageTitle: "Market",
    market,
  });
};

export const getMarketUpload = (req, res) => {
  return res.render("market/marketUpload", { pageTitle: "Market Upload" });
};

export const postMarketUpload = async (req, res) => {
  const { title, division, price, zone, contents } = req.body;
  try {
    await Market.create({
      title,
      division,
      price,
      zone,
      contents,
    });
    return res.redirect("/marketView");
  } catch (error) {
    return res.render("market/marketUpload", {
      pageTitle: "Market Upload",
      errorMessage: error._message,
    });
  }
};

export const marketEdit = (req, res) => {
  return res.send("market Edit");
};

export const marketDelete = (req, res) => {
  return res.send("market Delete");
};
