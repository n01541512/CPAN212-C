const http = require('http')
const app = http.createServer((req, res)=>{
    if(req.url === "/") {
        res.end()
    }
})
app.listen(8000)