// Load Configs
import api from './api';
import ui from './ui';
import config from './config';

import express from 'express';
const app = express();

app.get('/', (req, res) => { res.redirect('/ui/'); });
app.use('/api/', api);
app.use('/ui/', ui);

app.listen(config.port, () => console.log("Listening on port " + config.port));

