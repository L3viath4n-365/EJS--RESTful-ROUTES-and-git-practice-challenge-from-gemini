import express from "express";
import db from '../database/db.js';
import { v7 as uuidv7 } from 'uuid';

const router = express.Router();

router.get('/projects', async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM public.projects ORDER BY created_at DESC');
        res.render('projects/project', { dataBase: result.rows });
    } catch (err) {
        next(err);
    }
});

router.get('/projects/new', (req, res) => {
    res.render('projects/new');
});

router.post('/projects', async (req, res, next) => {
    try {
        const { title, stack } = req.body;
        const status = ["Stable", "In Progress", "Breaking"];
        const randomStatus = status[Math.floor(Math.random() * status.length)];
        const healthScore = Math.floor(Math.random() * 100) + 1;

        await db.query(
            'INSERT INTO public.projects (id, title, tech_stack, status, health_score) VALUES ($1, $2, $3, $4, $5)',
            [uuidv7(), title, stack, randomStatus, healthScore]
        );

        res.redirect('/projects');
    } catch (err) {
        next(err);
    }
});

router.get('/projects/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM public.projects WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Project Not Found');
        }

        res.render('projects/show', { data: result.rows[0] });
    } catch (err) {
        next(err);
    }
});

router.delete('/projects/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM public.projects WHERE id = $1', [id]);
        res.redirect('/projects');
    } catch (err) {
        next(err);
    }
});

export default router;