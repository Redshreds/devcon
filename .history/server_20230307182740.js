const express = require * 'express';

const app = express();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT;

app.lsiten(PORT, () => console.log(`Server started on port ${PORT}`));
