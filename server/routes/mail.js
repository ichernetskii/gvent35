const {Router} = require("express");
const router = Router();

// Middleware
const checkErrors = require("../middleware/checkErrors.middleware.js");

// Controllers
const {send} = require("../controllers/mail.js");

router.post(
    "/send",
    checkErrors(),
    send
);

module.exports = router;
