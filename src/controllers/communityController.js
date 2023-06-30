export const communityView = (req, res) => {
  return res.render("community/communityView", { pageTitle: "Community" });
};

export const commuUpload = (req, res) => {
  return res.send("Upload Board");
};

export const see = (req, res) => {
  return res.send("View Board");
};

export const commuEdit = (req, res) => {
  return res.send("Edit Board");
};

export const commuDelete = (req, res) => {
  return res.send("Delete Board");
};
