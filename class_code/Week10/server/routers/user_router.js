import express from "express";
import User from "../models/user.js";
import bcrypt, { hash } from "bcryptjs"

const router = express.Router();

router.post("/register", (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            let newUser = new User( {
                email,
                password: hashedPassword
            });

            newUser.save()
                .then(() => {
                    res.json({message: "Account Registered"})
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

export default router;