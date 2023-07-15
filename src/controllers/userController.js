import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import Video from "../models/Video";
import Market from "../models/Market";
import Community from "../models/Community";
import Notice from "../models/Notice";

const ERROR_CODE = 400;

export const getJoin = (req, res) => {
  return res.render("users/createAccount", { pageTitle: "Create Account" });
};

export const postJoin = async (req, res) => {
  const { identifier, email, password, passwordcheck, name, location } =
    req.body;

  if (password !== passwordcheck) {
    return res.status(ERROR_CODE).render("users/createAccount", {
      pageTitle: "Create Account",
      passwordError: "비밀번호가 일치하지 않습니다.",
    });
  }

  const idExists = await User.exists({ identifier });
  if (idExists) {
    return res.status(ERROR_CODE).render("users/createAccount", {
      pageTitle: "Create Account",
      idError: "This ID is already taken.",
    });
  }

  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(ERROR_CODE).render("users/createAccount", {
      pageTitle: "Create Account",
      emailError: "This Email is already taken.",
    });
  }
  try {
    await User.create({
      identifier,
      email,
      password,
      name,
      location,
    });
    res.redirect("/login");
  } catch {
    return res.status(ERROR_CODE).render("users/createAccount", {
      pageTitle: "Create Account",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "LOGIN" });
};

export const postLogin = async (req, res) => {
  const { identifier, password } = req.body;
  const pageTitle = "LOGIN";
  const user = await User.findOne({ identifier, socialOnly: false });
  if (!user) {
    return res.status(ERROR_CODE).render("users/login", {
      pageTitle,
      errorMessage: "An account with this ID does not exists.",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(ERROR_CODE).render("users/login", {
      pageTitle,
      errorMessage: "비밀번호가 틀렸습니다.",
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;
  // console.log(req.session.user.name);

  return res.redirect("/");
};

export const startKakaoLogin = (req, res) => {
  // ?client_id=9a94f68aeae8e30a264084cd9171df4d&redirect_uri=http://localhost:4000/users/kakao/callback&response_type=code
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KAKAO_CLIENT,
    redirect_uri:
      "https://threemonth-snowboard-2e6321aec62c.herokuapp.com/users/kakao/finish",
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  // console.log(finalUrl);
  return res.redirect(finalUrl);
};

export const finishKakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KAKAO_CLIENT,
    client_secret: process.env.KAKAO_SECRET,
    grant_type: "authorization_code",
    redirect_uri:
      "https://threemonth-snowboard-2e6321aec62c.herokuapp.com/users/kakao/finish",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const kakaoTokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        //명시하지 않을 경우 text로 응답을 받음.
      },
    })
  ).json();
  if ("access_token" in kakaoTokenRequest) {
    const { access_token } = kakaoTokenRequest;
    const userRequest = await (
      await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/json",
        },
      })
    ).json();

    const emailObj = userRequest.kakao_account.email;

    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj });
    const userData = userRequest.kakao_account;
    // console.log(user);
    // console.log(userData);
    if (!user) {
      user = await User.create({
        avataUrl: userData.profile.profile_image_url
          ? `/${userData.profile.profile_image_url}`
          : "undefined",
        identifier: userData.email,
        name: userData.profile.nickname ? userData.profile.nickname : "Unknown",
        password: "",
        email: userData.email,
        socialOnly: true,
        location: "",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.user = null;
  req.flash("info", "로그아웃 되었습니다.");
  return res.redirect("/");
};

export const getUserEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};

export const postUserEdit = async (req, res) => {
  const {
    session: {
      user: { _id, email: sessionEmail, avatarUrl },
    },
    body: { email, name, location },
    file,
  } = req;
  // console.log(sessionEmail);

  let searchParam = [];
  if (sessionEmail !== email) {
    searchParam.push({ email });
  }
  if (searchParam.length > 0) {
    const foundUser = await User.findOne({ $or: searchParam });
    if (foundUser && foundUser._id.toString() !== _id) {
      return res.status(ERROR_CODE).render("users/edit-profile", {
        pageTitle: "Edit Profile",
        emailError: "This email is already taken.",
      });
    }
  }
  // console.log(file);

  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.location : avatarUrl,
      email,
      name,
      location: "",
    },
    { new: true }
  );
  req.session.user = updateUser;

  return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newpassword, passwordcheck },
  } = req;

  const ok = await bcrypt.compare(oldPassword, password);

  if (!ok) {
    return res.status(ERROR_CODE).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "기존 비밀번호와 같지 않습니다.",
    });
  }

  if (newpassword !== passwordcheck) {
    return res.status(ERROR_CODE).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "비밀번호가 같지 않습니다.",
    });
  }

  const user = await User.findById(_id);
  user.password = newpassword;
  await user.save();
  req.session.user.password = user.password;

  return res.redirect("/users/logout");
};

export const userProfile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  console.log(user);

  if (!user) {
    return res.status(404).render("404", { pageTitle: "User Not Found." });
  }
  return res.render("users/userProfile", {
    pageTitle: `${user.name}'s Profile`,
    user,
    recentVideo: user.videos[user.videos.length - 1],
  });
};
