const axios = require("axios");

export const getUsers = async () => {
  const users = await axios.get("http://localhost:3000/users");
  const u = await users.data;
  console.log(u);
  return u;
};
