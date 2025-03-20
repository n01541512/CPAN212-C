import express from "express";
import User from "../models/user.js";
import bcrypt, { hash } from "bcryptjs"

const router = express.Router();

router.post("/register", (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            let newUser = new User({
                email,
                password: hashedPassword
            });

            newUser.save()
                .then(() => {
                    res.json({ message: "Account Registered" })
                })
                .catch((err) => {
                    console.log(err);
                    return res.json({ message: "Account Registered" })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.json({ message: "Could not complete transaction" })
        })
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then((user_account) => {
            if (!user_account) {
                return res.json({ message: "User account not found" })
            }

            bcrypt
                .compare(password, user_account.password)
                .then()
                .catch((err) => {
                    console.log(err);
                    return res.json({ message: "Could not complete request" })
                })

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Could not complete request" })
        })
})

export default router;