const request = require("request");

const requestOptions = {
  url: "http://localhost:8080/users",
  method: "GET",
  headers: {
    "Apa-Bapa": "aaaa",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11",
    "Set-Cookie": "cookieString",
    Cookie: "kyes",

    Connection: "keep-alive",
  },
  Cookie: "cookieString",
  json: {},
  qs: {
    offset: 20,
  },
};

const getUsers = (req, res, next) => {
  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      console.log(body);
      res.send(body);
    } else {
      console.log(response.statusCode);
    }
  });
};

router.get("/", function (req, res, next) {
  axios.get("http://localhost:8080/users/").then((response) => {
    // handle success
    res.send(response.data);
  });

  //console.log(getBreeds());
  //return getBreeds;
});

module.exports = router;
/** 
module.exports = {
  getUsers,
};*/
