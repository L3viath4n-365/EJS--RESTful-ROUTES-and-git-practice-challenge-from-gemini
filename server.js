import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';
import apiRouter  from './routes/api.js';

const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
const __dirname = import.meta.dirname;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.req = req;
    res.locals.hasAll = (...keys) => keys.every(key => key in res.locals);
    res.locals.hasAny = (...keys) => keys.some(key => key in res.locals);
    next();
});

app.use('/', apiRouter);
app.use('/projects', apiRouter);
app.use('/projects/new', apiRouter);
app.use('/projects/:id', apiRouter);

app.use((err, _req, res, _next) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    } else {
        console.error(err.message);
    }

    const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
    res.status(statusCode).send('500 — Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server online on port ${port} (${nodeEnv})`);
});