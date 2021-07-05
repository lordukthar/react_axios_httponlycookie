import { useState, useEffect } from "react";
import { getUsers } from "./server";

const axios = require("axios");

function callAxios() {
  return axios.get("http://webcode.me").then((resp) => {
    console.log(resp.data);
  });
}

function callAxiosTwo() {
  return axios.get("/users").then((resp) => {
    console.log(resp.data);
  });
}

function callGoogle() {
  return axios.get("/").then((resp) => {
    console.log(resp.data);
  });
}

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = getUsers();
        const json = await response;
        console.log("json" + JSON.stringify(json));
        setUsers(json.map((it) => it.name));
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={callGoogle}> Activate google</button>
      <button onClick={callAxiosTwo}> Activate new lasers</button>
      <button onClick={callAxios}> Activate Lasers</button>

      <ul>
        {users.map((person, i) => (
          <li key={i}>1: {person}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
