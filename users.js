var express = require("express");
var router = express.Router();

const cookieParser = require("cookie-parser");

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
  console.log("My cookies");
  console.log(JSON.stringify(req.cookies));
  console.log(req.signedCookies);

  console.log(JSON.stringify(req.signedCookies));
  var arr = req.signedCookies;

  console.log(arr);

  for (let value of Object.keys(arr)) {
    console.log(value);
  }

  console.log(arr["Anders"]);
  var a = Buffer.from("topare").toString("base64");

  axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
    // handle success
    res.cookie("Anders", a, {
      signed: true,
      httpOnly: true,
    });
    res.send(response.data);
  });

  //console.log(getBreeds());
  //return getBreeds;
});

function b(arr, id) {
  return arr.filter((item) => {
    return item.id === idToSearch;
  });
}

module.exports = router;
