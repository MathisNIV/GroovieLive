const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.post('/song', (req, res) => {
    console.log(req.body);
    res.send('Received a POST request');
});
const port = 3001;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));