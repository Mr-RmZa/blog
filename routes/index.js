const { Router } = require("express");
const userController = require("../controllers/userController");

const router = new Router();

router.get("/", (req, res) => {
    res.render("index", { pageTitle: "وبلاگ" });
});

router.get("/login", (req, res) => {
    res.render("login")
});

router.get("/register", (req, res) => {
    res.render("register")
})

router.post("/auth/login", userController.login)
router.post("/auth/register", userController.register)
router.post("/file", userController.file)

module.exports = router;