import Notice from "../models/Notice";
import User from "../models/User";

const ERROR_CODE = 404;

export const noticeView = async (req, res) => {
  const notices = await Notice.find({}).sort({ createdAt: "desc" });
  // console.log(notice);
  return res.render("notice/noticeView", { pageTitle: "Notice", notices });
};

export const noticeRead = async (req, res) => {
  const { id } = req.params;
  const notice = await Notice.findById(id).populate("owner");
  // console.log(notice);
  return res.render("notice/noticeRead", { pageTitle: "Notice", notice });
};

export const getNoticeUpload = async (req, res) => {
  return res.render("notice/noticeUpload", {
    pageTitle: "Notice Upload",
  });
};

export const postNoticeUpload = async (req, res) => {
  const { _id } = req.session.user;
  const { title, contents } = req.body;
  try {
    const newNotice = await Notice.create({
      title,
      contents,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.notices.push(newNotice._id);
    user.save();

    return res.redirect("/noticeView");
  } catch (error) {
    return res.render("notice/noticeUpload", {
      pageTitle: "Notice Upload",
      errorMessage: error._message,
    });
  }
};

export const getNoticeEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const notice = await Notice.findById(id);

  if (!notice) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "There are no posts" });
  }
  if (String(notice.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("notice/noticeEdit", {
    pageTitle: `Edit ${notice.title}`,
    notice,
  });
};

export const postNoticeEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, contents },
  } = req;
  // console.log(req.body);

  const {
    user: { _id },
  } = req.session;
  if (String(notice.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  const notice = await Notice.findById(id);

  if (!notice) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "There are no posts" });
  }

  await Notice.findByIdAndUpdate(id, {
    title,
    contents,
  });
  return res.redirect("/noticeView");
};

export const noticeDelete = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const notice = await Notice.findById(id);
  const user = await User.findById(_id);

  if (!notice) {
    return res
      .status(ERROR_CODE)
      .render("404", { pageTitle: "There are no posts" });
  }
  if (String(notice.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Notice.findByIdAndDelete(id);
  user.notices.splice(user.notices.indexOf(id), 1);
  user.save();
  return res.redirect("/noticeView");
};
