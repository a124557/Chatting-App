const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/", (req, res) => {
    res.send(__dirname, "client/public");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});