import express from 'express';
const router = express.Router();
import { promises as fs } from 'fs';
import {maisModelos, menosModelos, listaMaisModelos, listaMenosModelos, listaModelos} from '../controllers/marcas.js'

const { readFile, writeFile } = fs;

router.get('/maisModelos', maisModelos)
router.get('/menosModelos', menosModelos)
router.get('/listaMaisModelos/:number', listaMaisModelos)
router.get('/listaMenosModelos/:number', listaMenosModelos)
router.post('/listaModelos', listaModelos)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router