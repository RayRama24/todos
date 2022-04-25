import express from "express";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const router = express.Router();

let users = {};

router.get("/todos", (req, res) => {
  res.send(users);
});

router.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (id in users) {
    res.send(users[id]);
  } else {
    res.status(400).send("Error: user is empty");
    return;
  }
});

router.post("/todos", (req, res) => {
  const user = req.body.user;
  if (user == "") {
    res.status(400).send("Error: user is empty");
    return;
  }

  const id = Math.floor(Math.random() * 100 + 1); // generate 1 - 100

  users[id] = {
    user: user,
    done: false,
  };
  res.send("user added");
});

router.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (id in users) {
    delete users[id];
    res.send("data deleted");
  } else {
    res.status(400).send("error ID");
  }
});

router.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  // const text = req.body;
  if (id in users) {
    if (req.body.user == undefined || req.body.user == "") {
      users[id].done = req.body.done;
    }
  }
  if (id in users) {
    const user = req.body.user;
    const done = req.body.done;

    users[id] = {
      user: user,
      done: done,
    };
    res.send("data updated");
    return;
  }
});

export default router;
