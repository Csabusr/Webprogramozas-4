const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const addressRouter = require('./routes/address');
const studentRouter = require('./routes/student');
const neptunRouter = require('./routes/neptun');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/address', addressRouter);
app.use('/student', studentRouter);
app.use('/neptun', neptunRouter);

db = require('./config/db');

const port = Number(process.env.port || 4000)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
