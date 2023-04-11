const express = require('express');

const router = express.Router();


// Get applications list
router.get('/applications', async function view(req, res, next) {
    try {
        const {
            platformClient
        } = req;
        return res.json(await platformClient.configuration.getApplications({
            pageSize: 1000,
            q: JSON.stringify({"is_active": true})
        }));
    } catch (err) {
        next(err);
    }
});

module.exports = router;