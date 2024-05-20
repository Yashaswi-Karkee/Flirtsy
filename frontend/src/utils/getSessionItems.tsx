export const getSessionItems = () => {
  const token = window.sessionStorage.getItem("token");
  const email = window.sessionStorage.getItem("email");
  const name = window.sessionStorage.getItem("name");
  const userId = window.sessionStorage.getItem("userId");
  const avatar = window.sessionStorage.getItem("avatar");
  const bio = window.sessionStorage.getItem("bio");
  const max_age= window.sessionStorage.getItem('max_age');          
  const min_age= window.sessionStorage.getItem('min_age');
  const interestedIn= window.sessionStorage.getItem('interestedIn');
  const age= window.sessionStorage.getItem('age');
  const sessionVariable = {
    token: token,
    email: email,
    name: name,
    userId: userId,
    avatar: avatar,
    bio: bio,
    max_age: max_age,
    min_age: min_age,
    interestedIn: interestedIn,
    age: age
  };
  console.log(sessionVariable)
  return sessionVariable;
};
