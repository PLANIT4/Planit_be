const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM community');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM community WHERE post_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    const { post_title, user_id, content, image_url, category } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO community (post_title, user_id, content, image_url, category) VALUES (?, ?, ?, ?, ?)',
            [post_title, user_id, content, image_url, category]
        );
        res.status(201).json({ post_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/:id/comments', async (req, res) => {
    const { user_id, content } = req.body;
    try {
        await pool.query(
            'INSERT INTO comment (post_id, user_id, content) VALUES (?, ?, ?)',
            [req.params.id, user_id, content]
        );
        res.status(201).json({ message: 'Comment added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id/comments', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM comment WHERE post_id = ? ORDER BY created_at ASC',
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;

