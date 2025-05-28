const express = require('express');
const router = express.Router();

let posts = [];

router.get('/', (req, res) => {
    res.json(posts);
});

router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
});

router.post('/', (req, res) => {
    const { title, content, user } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        user,
        comments: []
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const { title, content } = req.body;
    post.title = title;
    post.content = content;
    res.json(post);
});

router.delete('/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.json({ message: 'Post deleted' });
});

router.post('/:id/comments', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const { user, content } = req.body;
    const newComment = {
        id: post.comments.length + 1,
        user,
        content
    };
    post.comments.push(newComment);
    res.status(201).json(newComment);
});

module.exports = router;
