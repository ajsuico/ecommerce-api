const router = require("express").Router();

router.post("/products");
router.get("/:id");
router.put("/:id");
router.put("/:id/archive");



module.exports = router;