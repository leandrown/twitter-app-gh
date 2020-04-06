const express = require('express');
const app = express();
const PORT = 3333;

app.get('/', (req, res) => {
    res.send('Hello world! Mandrillus Team!');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});