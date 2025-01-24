import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the lab router")
})

router.get("/name", (req, res) => {
    res.send("Adel Ali")
})

router.get("/greeting", (req, res) => {
    res.send("Adel Ali - N01541512")
})

router.get("/add/:x/:y", (req, res) => {
    let x = parseFloat(req.params.x);
    let y = parseFloatreq.params.y;

    res.send(`${x + y}`)
});

router.get("/calculate", (req, res) => {
    let a = parseFloat(req.params.a)
    let b = parseFloat(req.params.b)
    switch (req.params.operator) {
        case "+":
            res.send(`${a + b}`)
            break;
        case "-":
            res.send(`${a - b}`)
            break;
        case "*":
            res.send(`${a * b}`)
            break;
        case "/":
            res.send(`${a / b}`)
            break;
        default:
            res.send("WRONG OPERATION");
    }
});

export default router;
