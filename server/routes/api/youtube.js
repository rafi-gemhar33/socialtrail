const express = require("express");
const router = express.Router();

const youtubeController = require("../../controllers/youtubeController");

/* GET home page. */
router.get("/channel/:username", youtubeController.getChannelDetails);
router.get("/searchList/:id", youtubeController.getsearchList);


module.exports = router;
