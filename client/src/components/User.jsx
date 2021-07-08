import { useState, useEffect } from "react";
import { getUsers } from "./server";

const axios = require("axios");

function callAxios() {
  alert("jdhfkjsah");
}

const User = () => {
  const [user, setUser] = useState("Jonas");

  function handleChange(event) {
    setUser(event.target.value);
  }

  function callGoogle() {
    axios
      .post("/user", {
        user,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function handleSubmit(event) {
    callGoogle();
    event.preventDefault();
  }

  // const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {user} times</p>

      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" value={user} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <button onClick={() => callAxios()}>Click me</button>
      </form>
    </div>
  );
};

export default User;
