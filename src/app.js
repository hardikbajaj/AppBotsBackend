const express= require('express');
const app = express();
const env = require('dotenv');
const router= require('./routes');
const cors= require('cors');
const bodyParser = require('body-parser');
const jsend = require('./plugins/jsend')
const mongoose= require('mongoose');

env.config();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



const mongoURL= `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@hardik.6hxsc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
const localMongo= `mongodb://localhost/${process.env.MONGO_DB_DATABASE}`;
mongoose.connect(mongoURL ,
 {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
});


app.use(cors());
app.use(jsend());
app.use('/',router);

module.exports = app

// app.get('/', (req, res) => {
//     res.send('The Server is working awesome, Welcome to AILights');
// });