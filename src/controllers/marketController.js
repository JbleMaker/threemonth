export const marketView = (req, res) => {
  console.log(req.params);
  return res.render("market/marketView", { pageTitle: "Market" });
};

export const marketUpload = (req, res) => {
  return res.send("upload");
};

export const marketSee = (req, res) => {
  console.log(req.params);
  return res.send("market");
};

export const marketEdit = (req, res) => {
  return res.send("market Edit");
};

export const marketDelete = (req, res) => {
  return res.send("market Delete");
};
