const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");

router.post("/register", (req, res) => {
  // implement registration
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  db("users")
    .insert({ ...req.body }, "*")
    .then(data => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "error creating user", error });
    });
});

router.post("/login", (req, res) => {
  // implement login
  db("users")
    .select("*")
    .where("username", req.body.username)
    .first()
    .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        const token = signToken(data);
        res.status(200).json({ message: `Welcome ${data.username}`, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error,
        errorMessage: "error logging in  user"
      });
    });
});

function signToken(user) {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "silver Star Secured";

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
