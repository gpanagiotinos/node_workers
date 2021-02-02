const express = require('express')
const { Worker } = require('worker_threads')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/workers', (req, res) => {
    res.sendFile(`${__dirname}/workers.html`)
})

app.get('/async/:time', async (req, res) => {
    const time = Number(req.params.time)
    const response = await new Promise(resolve => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
    res.send(`Response async ${response}...`)
})

app.get('/wait/:time', (req, res) => {
    const time = Number(req.params.time)
    let doSomething = 0
    const end = Date.now() + time;
    while (Date.now() < end) {
        doSomething += 1
    }
    res.send(`Response async ${time}...`)
})

app.get('/worker/:time', (req, res) => {
    const worker = new Worker(__dirname + "/worker.js", { workerData: { workingTime: req.params.time } })
    worker.on("message", () => res.send(`Response async ${req.params.time}...`))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})