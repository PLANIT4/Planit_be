const express = require('express');
const router = express.Router();

const popularPosts = [];
const recentTips = [];

router.get('/summary', (req, res) => {
    res.json({
        popularPosts,
        recentTips
    });
});

module.exports = router;
