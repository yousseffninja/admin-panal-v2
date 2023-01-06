const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const typeRoutes = require('./routes/productTypeRoutes')
const offerEventRoute = require('./routes/offerEventRoutes')
const offerHeaderRoute = require('./routes/offerHeaderRoutes')

const app = express();

app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: {
            allowOrigins: ['*'],
        },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ['*'],
                scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
            },
        },
    })
);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors({credentials: true}));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!!',
});

app.use('/api', limiter);

app.use(mongoSanitize());

app.use(xss());

app.use(express.json({ limit: '10kb' }));

app.use(compression());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/types', typeRoutes);
app.use('/api/v1/offerEvent', offerEventRoute);
app.use('/api/v1/offerHeader', offerHeaderRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on our server`, 404));
});

app.use(globalErrorHandler)

module.exports = app;