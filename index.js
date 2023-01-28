import express from 'express';
import winston from 'winston';
import marcasRouter from './routes/marcas.js'
global.fileName = "car-list.json";
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'api-consulta-de-carros.log' })
    ],
    format: combine(
        label({ label: 'api-consulta-de-carros' }),
        timestamp(),
        myFormat
    )
})

const app = express();
app.use(express.json());

app.use("/marcas", marcasRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName)
        logger.info('listening on 3000');
    } catch (err) {
            logger.error(err)
    }
})