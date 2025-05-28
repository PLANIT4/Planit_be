const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const communityRouter = require('./routes/community');
const tipsRouter = require('./routes/tips');
const mainRouter = require('./routes/main');

app.use(cors());
app.use(express.json());

app.use('/community', communityRouter);
app.use('/tips', tipsRouter);
app.use('/main', mainRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
