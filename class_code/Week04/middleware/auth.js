const auth = (req, res, next) => {
    if (req.query.username === "Adel") {
       next(); 
    } else {
        res.send("ACCESS NOT ALLOWED")
        res.redirext("http://localhost:8000")
        res.json
    }
};

export default auth;