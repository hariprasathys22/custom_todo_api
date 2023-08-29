const http = require('http');
const express = require("express")
const cors = require('cors')
const itemsRouter = require('./routes/items')
const app = express()
app.use(cors())

app.use(express.json())

app.use('/items', itemsRouter);

const port = 4000
const server = http.createServer(app)
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
