const { getVisits, createVisit } = require("../controllers/visitsController");
const router = require("express").Router();

router.get("/", getVisits);
router.post("/", createVisit);

module.exports = router;