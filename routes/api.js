import express from "express";
import db from '../database/db.js';
import { v7 as uuidv7 } from 'uuid';


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.render('index', { err: null });
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
            : res.render('projects/project', { dataBase: data, err: null });
    } catch (err) {
        res.render('projects/project', { dataBase: null, err: err.message });
        next(err)
    }
});

router.get('/projects/filter', async (req, res, next) => {
    try {
        const { title } = req.query;
        const result = await db.query("SELECT * FROM public.projects WHERE title ILIKE '%' || $1 || '%'", [title.trim()]);
        const data = result.rows;

        return data.length === 0
            ? res.render('projects/project', { dataBase: data, err: 'No cards matched this title'.toUpperCase() })
            : res.render('projects/project', { dataBase: data, err: null });
    } catch (err) {
        res.render('projects/project', { dataBase: null, err: err.message });
        next(err)
    }
});

router.get('/projects/new', (req, res, next) => {
    try {
        res.render('projects/new', { err: null });
    } catch (err) {
        res.render('projects/new', { err: err.message });
        next(err);
    }
});

router.post('/projects', async (req, res, next) => {
    try {
        const { title, stack } = req.body;
        const status = ["Stable", "In Progress", "Breaking"];
        const randNum = Math.floor(Math.random() * status.length);
        let randomStatus = status[randNum];

        let healthScore = Math.floor(Math.random() * 100) + 1;

        const input = await db.query(
            'INSERT INTO public.projects (id, title, tech_stack, status, health_score) VALUES ($1, $2, $3, $4, $5)',
            [uuidv7(), title, stack, randomStatus, healthScore]
        );

        const result = await db.query(
            'SELECT * FROM public.projects',
        );
        const data = result.rows;

        return data.length === 0
            ? res.redirect('/projects/new')
            : res.render('projects/project', { dataBase: data, err: null });
    } catch (err) {
        res.render('projects/project', { dataBase: null, err: err.message });
        next(err);
    }
});

router.get('/projects/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM public.projects WHERE id = $1', [id]);
        const data = result.rows;

        res.render('projects/show', { data: data[0], err: null });
    } catch (err) {
        res.render('projects/show', { data: null, err: err.message });
        next(err);
    }
});

router.delete('/projects/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM public.projects WHERE id = $1', [id]);

        const result = await db.query(
            'SELECT * FROM public.projects',
        );
        const data = result.rows;

        return data.length === 0
            ? res.redirect('/projects/new')
            : res.render('projects/project', { dataBase: data, err: null });
    } catch (err) {
        res.render('projects/project', { dataBase: null, err: err.message });
        next(err);
    }
});

export default router;