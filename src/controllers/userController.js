export const viewHome = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const edit = (req, res) => {
  return res.send("Edit User Profile");
};

export const removeId = (req, res) => {
  return res.send("Remove user ID");
};

export const getJoin = (req, res) => {
  return res.send("Join us");
};

export const postJoin = (req, res) => {};

export const getLogin = (req, res) => {
  return res.send("Login");
};

export const postLogin = (req, res) => {};

export const search = (req, res) => {
  return res.send("Search");
};

export const watch = (req, res) => {
  return res.send("Watch");
};

export const logout = (req, res) => {
  return res.send("logout");
};
