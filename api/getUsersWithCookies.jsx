const axios = require("axios");

const axiosCookieJarSupport = require("axios-cookiejar-support").default;
const tough = require("tough-cookie");
axiosCookieJarSupport(axios);

var Cookies = require("cookies");

function parseCookies(str) {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let obj = {};
  for (let m; (m = rx.exec(str)); ) obj[m[1]] = decodeURIComponent(m[2]);
  return obj;
}

function stringifyCookies(cookies) {
  return Object.entries(cookies)
    .map(([k, v]) => k + "=" + encodeURIComponent(v))
    .join("; ");
}

function cookieJarToJSON(jar) {
  return JSON.stringify(jar.store.idx);
}

function cookieJarToJSONKeys(jar) {
  var id = JSON.stringify(jar.store.idx);

  for (var i in idx) {
    for (var o in idx[i]) {
      for (var cookieKey in idx[i][o]) {
        var c = idx[i][o][cookieKey];
        console.log(c.domain);
        console.log(c.path);
        console.log(c);
      }
    }
  }
}

function cookieJarFromJSON(json) {
  var idx = JSON.parse(json),
    jar = new CookieJar();

  for (var i in idx) {
    for (var o in idx[i]) {
      for (var cookieKey in idx[i][o]) {
        var c = idx[i][o][cookieKey];
        jar.setCookieSync(new Cookie(c).toString(), {
          hostname: c.domain,
          path: c.path,
        });
      }
    }
  }

  return jar;
}

const cookieJar = new tough.CookieJar();

function getcookie(response) {
  var cookie = response.headers;
  // user=someone; session=QyhYzXhkTZawIb5qSl3KKyPVN (this is my cookie i get)
  return cookie.split("; ");
}

const getUsersWithCookies = (req, res, next) => {
  axios
    //.get("https://jsonplaceholder.typicode.com/todos", {
    .get("https://www.google.com", {
      headers: {
        Cookie: "cookie1=value; cookie2=value; cookie3=value;",
      },
      jar: cookieJar, // tough.CookieJar or boolean
      withCredentials: true, // If true, send cookie stored in jar
    })
    .then((response) => {
      var keys = Object.keys(response.headers);
      var values = Object.values(response.headers);
      //console.log(cookieJarToJSON(cookieJar));

      var responseCookies = response.headers["set-cookie"];
      console.log(responseCookies);
      //let cookie = request.cookie("cookie1");

      //  let cookie = request.cookie("data=3");

      for (var i = 0; i < keys.length; i++) {
        res.header(keys[i], values[i]);
        // res.cookie;
      }
      res.header("my-dummy-header", "no-use-vale");
      res.send(response.data);
    });
};

module.exports = {
  getUsersWithCookies,
};
