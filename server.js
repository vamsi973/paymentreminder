const express = require('express');
const app = express();
const mongoConnection = require('./middlewares/mongodb')
var port = 2900;
app.use(express.json())
app.use(express.urlencoded({
    extended :true
}))

// app.get('/', (req, res) => {
//     res.send("hello world")
// });


let db;
mongoConnection().then(databaseConnection => {
    db = databaseConnection;
}).catch(error => {
    console.log(error);
    process.exit(1);
})

app.use((req, res, next) => {
    if (!db) {
        mongoConnection().then(database => {
            db = database;
            req.mongoConnection = db;
            next();
        }).catch(err => {
            res.send({ success: false, error: 'Mongo Error!' })
            return;
        })
    }
    req.mongoConnection = db;
    next();
})

//routes modules import 

const client = require('./Routes/client.route')

app.use('/client', client)
//for test purpose
// app.post('/insert', (req, res) => {
//     let data = {};
//     req.mongoConnection.collection('client').insert({
//         name:"ijj",
//         kol:'389247'
//     })
// })


app.listen(port, () => {
    console.log(`server started at ${port}`)
})