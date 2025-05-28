const express = require('express');
const router = express.Router();

let tips = [];

router.get('/', (req, res) => {
    res.json(tips);
});

router.get('/:id', (req, res) => {
    const tip = tips.find(t => t.id == req.params.id);
    if (!tip) return res.status(404).json({ error: 'Tip not found' });
    res.json(tip);
});

router.post('/', (req, res) => {
    const { title, content, user } = req.body;
    const newTip = {
        id: tips.length + 1,
        title,
        content,
        user
    };
    tips.push(newTip);
    res.status(201).json(newTip);
});

router.put('/:id', (req, res) => {
    const tip = tips.find(t => t.id == req.params.id);
    if (!tip) return res.status(404).json({ error: 'Tip not found' });
    const { title, content } = req.body;
    tip.title = title;
    tip.content = content;
    res.json(tip);
});

router.delete('/:id', (req, res) => {
    tips = tips.filter(t => t.id != req.params.id);
    res.json({ message: 'Tip deleted' });
});

module.exports = router;
