export const noticeView = (req, res) => {
  return res.render("notice/noticeView", { pageTitle: "Notice" });
};

export const noticeUpload = (req, res) => {
  return res.send("Notice Upload");
};

export const noticeSee = (req, res) => {
  return res.send("Look at the notice");
};

export const noticeEdit = (req, res) => {
  return res.send("notice Edit");
};

export const noticeDelete = (req, res) => {
  return res.send("notice Delete");
};
