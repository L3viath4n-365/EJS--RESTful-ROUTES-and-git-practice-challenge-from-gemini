import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
const __dirname = import.meta.dirname;

// CONFIGURATION & VIEWS
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// SECURITY & UTILITY MIDDLEWARE
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// BODY PARSERS & STATIC FILES
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS LOCALS HELPERS
app.use((req, res, next) => {
    res.locals.req = req;
    res.locals.hasAll = (...keys) => keys.every(key => key in res.locals);
    res.locals.hasAny = (...keys) => keys.some(key => key in res.locals);
    next();
});

const dataBase = [];

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/project', (req, res) => {
    res.render('projects/project', { dataBase });
});

app.get('/new', (req, res) => {
    res.render('projects/new');
});

app.post('/project', (req, res) => {
    const { title, stack } = req.body;
    const status = ["Stable", "In Progress", "Breaking"];
    const randNum = Math.floor(Math.random() * status.length);
    let randomStatus = status[randNum];

    let healthScore = Math.floor(Math.random() * 100) + 1;

    dataBase.push({ title, stack, status: randomStatus, healthScore, id: uuidv4 });

    res.redirect('/project');
});

// ERROR HANDLING MIDDLEWARE
app.use((_req, res) => {
    res.status(404).send('404 — Page not found');
});

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send('500 — Internal Server Error');
});

// SERVER
app.listen(port, () => {
    console.log(`🚀 Server online on port ${port} (${nodeEnv})`);
});