const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const pool = require('../database');
const { isloggedin, isNotLoggedin } = require('../lib/auth');

router.get('/', isloggedin, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', {links});
});

router.get('/add', (req, res) => {
    res.render('links/add');
}); 

router.post('/add', isloggedin, async (req, res) => {
    const {title, url, description} = req.body;
    const new_link = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links SET ?', [new_link]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newlink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [newlink, id]);
    req.flash('success', 'Link edited successfully');
    res.redirect('/links');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link deleted successfully');
    res.redirect('/links');
});

module.exports = router;