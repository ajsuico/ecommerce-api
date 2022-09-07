const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const {
  registerUser,
  loginUser,
  setAsAdmin,
  checkOut,
} = userControllers
/* Customer Routes */
router.get("/myOrders");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/checkout", checkOut);

/* Admin Routes */
router.put("/:id/setAsAdmin", setAsAdmin);
router.get("/orders");

module.exports = router;


