var express = require("express");
var router = express.Router();

const axios = require("axios");
const axiosCookieJarSupport = require("axios-cookiejar-support").default;
const tough = require("tough-cookie");
axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const getBreeds = () => {
  try {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      // handle success

      return response.data;
    });
  } catch (error) {
    console.error(error);
  }
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    // handle success
    res.send(response.data);
  });

  //console.log(getBreeds());
  //return getBreeds;
});

module.exports = router;
