import express from 'express';
//Sequelize db authentication
import dbAuthenticate from '../db/dbconfig/dbAuth.js';

//Middleware
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import cookieParser from 'cookie-parser';

//Config
import corsOptions from '../config/corsConfig.js';
import pinoOptions from '../config/pinoConfig.js';

//Routes
import authRouter from '../routers/authRouter.js'
import userRouter from '../routers/userRouter.js';

const app = express();
const PORT = process.env.PORT || 8000;

//middleware that we want to apply to all routes
// app.use(pinoHttp(pinoOptions));
app.use(cors(corsOptions)); // cross origin resource sharing 
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//routes
app.use('/', userRouter)
app.use('/auth',authRouter);

//expose port
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
})
;


dbAuthenticate();
