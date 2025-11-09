const express = require('express');
const aiRoutes = require('./ai.routes');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "https://55b9d4d3.code-review-frontend.pages.dev", // tera frontend ka link
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('padhle padh sale');
});
app.use('/ai', aiRoutes);


module.exports = app;


