const express = require("express");
const router = express.Router();
const apiController = require("../Controller/Api");
const passport = require("passport");
const multer = require("multer");
const upload = multer().single("name");
router.get(
  "/verifytoken",
  passport.authenticate("jwt", { session: false }),
  apiController.verifyToken
);
router.get("/posts", apiController.fetchPosts);
router.post(
  "/createpost",

  apiController.createPost
);

module.exports = router;
