
import express from 'express';
const router = express.Router();
export default router;

import { componentRepository, html } from './swc';
import { bootstrapcomponent } from './swc.mjs';

router.get('/', (req, res) => {
    res.send(
        html("MOSF - DB",
            bootstrapcomponent("db-app")
        )
    );
});

router.get('/components/:cmpname.mjs', componentRepository());