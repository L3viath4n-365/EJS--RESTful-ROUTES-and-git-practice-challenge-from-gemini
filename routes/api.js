import express from "express";
import db from '../database/db.js';
import { v7 as uuidv7 } from 'uuid';


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('index');
    } catch (err) {
        next(err)
    }
});

router.get('/projects', async (req, res, next) => {
    try {
        const result = await db.query(
            'SELECT * FROM public.projects',
        );
        const data = result.rows;

        return data.length === 0
            ? res.redirect('/projects/new')
            : res.render('projects/project', { dataBase: data });
    } catch (err) {
        next(err)
    }
});

router.get('/projects/new', (req, res, next) => {
    try {
        res.render('projects/new');
    } catch (err) {
        next(err);
    }
});

router.post('/projects', async (req, res) => {
    try {
        const { title, stack } = req.body;
        const status = ["Stable", "In Progress", "Breaking"];
        const randNum = Math.floor(Math.random() * status.length);
        let randomStatus = status[randNum];

        let healthScore = Math.floor(Math.random() * 100) + 1;

        const result = await db.query(
            'INSERT INTO public.projects (id, title, tech_stack, status, health_score) VALUES ($1, $2, $3, $4, $5)',
            [uuidv4(), title, stack, randomStatus, healthScore]
        );
        res.redirect('/projects');

    } catch (err) {
        console.error('Database query error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM public.projects WHERE id = $1', [id]);
        const data = result.rows;

        res.render('projects/show', { data: data[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM public.projects WHERE id = $1', [id]);

        res.redirect('/projects');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;