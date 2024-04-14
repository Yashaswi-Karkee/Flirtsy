export const getSessionItems = () => {
  const token = window.sessionStorage.getItem("token");
  const email = window.sessionStorage.getItem("email");
  const name = window.sessionStorage.getItem("name");
  const userId = window.sessionStorage.getItem("userId");
  const avatar = window.sessionStorage.getItem("avatar");
  const bio = window.sessionStorage.getItem("bio");
  const sessionVariable = {
    token: token,
    email: email,
    name: name,
    userId: userId,
    avatar: avatar,
    bio: bio,
  };
  return sessionVariable;
};
