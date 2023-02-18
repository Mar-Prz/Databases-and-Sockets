let express = require("express");
let router = express.Router();
let client = require("../dbConnect");
let projectsCollection;
let controller = require("../controller");

//post project ..
router.post("/", (req, res) => {
  controller.projectController.createProjects(req, res);
});

router.get("/", (req, res) => {
  controller.projectController.retrieveProjects(req, res);
});

module.exports = router;
