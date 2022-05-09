const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.post('/api/auth', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({ access: 'token' })
    // res.end('end');

})

server.use(jsonServer.bodyParser)

// server.use((req, res, next) => {
//     if (false) { // add your authorization logic here
//
//         next() // continue to JSON Server router
//     } else {
//         res.sendStatus(401)
//     }
// })

server.use(router)
server.listen(3004, () => {
    console.log('JSON Server is running')
})