const express = require('express')

const app = express()

const port = 3096

app.get('/', (req,res) => {
    res.send("Hello, Brenden");
})

app.get('/brenden', (req,res) => {
    res.send("Hello, not brenden");
})


app.listen(port, () => {
    console.log(`Listening at: http://localhost:${port}`)
})