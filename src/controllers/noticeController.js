import Notice from "../models/Notice";

export const noticeView = async (req, res) => {
  const notices = await Notice.find({});
  // console.log(notice);
  return res.render("notice/noticeView", { pageTitle: "Notice", notices });
};

export const noticeRead = async (req, res) => {
  const { id } = req.params;
  const notice = await Notice.findById(id);
  return res.render("notice/noticeRead", { pageTitle: "Notice", notice });
};

export const getNoticeUpload = async (req, res) => {
  return res.render("notice/noticeUpload", {
    pageTitle: "Notice Upload",
  });
};

export const postNoticeUpload = async (req, res) => {
  const { title, contents } = req.body;
  try {
    await Notice.create({
      title,
      contents,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("notice/noticeUpload", {
      pageTitle: "Notice Upload",
      errorMessage: error._message,
    });
  }
};

export const noticeEdit = (req, res) => {
  return res.send("notice Edit");
};

export const noticeDelete = (req, res) => {
  return res.send("notice Delete");
};
