export const validateLogin = (login: string) => {
  return login.split(" ").join("%20");
};
