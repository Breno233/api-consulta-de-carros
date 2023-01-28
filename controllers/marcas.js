import express from 'express';
const router = express.Router();
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const maisModelos = async (req, res, next) => {
    const data = JSON.parse(await readFile("car-list.json"));
    try {
        let max = data.map(a => a.models.length).reduce(function (a, b) {
            return (
                Math.max(a, b)
            )
        })
        let arrayBrands = data.filter((value) => {
            if (value.models.length == max) {
                return value
            }
        })
        let brands = arrayBrands.map(a => a.brand)
        console.log(brands)
        res.send(brands);
        logger.info(`GET /maisModelos`)
    } catch (err) {
        next(err);
    }
}

const menosModelos = async (req, res, next) => {
    const data = JSON.parse(await readFile("car-list.json"));
    try {
        let min = data.map(a => a.models.length).reduce(function (a, b) {
            return (
                Math.min(a, b)
            )
        })
        let arrayBrands = data.filter((value) => {
            if (value.models.length == min) {
                return value
            }
        })
        let brands = arrayBrands.map(a => a.brand)
        console.log(brands)
        res.send(brands);
        logger.info(`GET /menosModelos`)
    } catch (err) {
        next(err);
    }
}

const listaMaisModelos = async (req, res, next) => {
    const data = JSON.parse(await readFile("car-list.json"));
    try {
        let max = data.map(a => a.models.length).sort((a, b) => b - a).slice(0, req.params.number)
        let intecection = []
        let arrayBrands = data.filter(value1 => {
            max.some(value2 => {
                if (value1.models.length === value2) {
                    intecection.push(value1)
                }
            })
        })
        let brands = intecection.sort((a, b) => b.models.length - a.models.length).map(a => `${a.brand} - ${a.models.length}`)
        let brandsValidation = brands.filter((a, b) => brands.indexOf(a) === b)
        console.log(brandsValidation)
        res.send(brandsValidation);
        logger.info(`GET /listaMaisModelos/:number`)
    } catch (err) {
        next(err);
    }
}

const listaMenosModelos = async (req, res, next) => {
    const data = JSON.parse(await readFile("car-list.json"));
    try {
        let min = data.map(a => a.models.length).sort((a, b) => a - b).slice(0, req.params.number)
        let intecection = []
        let arrayBrands = data.filter(value1 => {
            min.some(value2 => {
                if (value1.models.length === value2) {
                    intecection.push(value1)
                }
            })
        })
        let brands = intecection.sort((a, b) => a.models.length - b.models.length).map(a => `${a.brand} - ${a.models.length}`)
        let brandsValidation = brands.filter((a, b) => brands.indexOf(a) === b)
        console.log(brandsValidation)
        res.send(brandsValidation);
        logger.info(`GET /listaMenosModelos/:number`)
    } catch (err) {
        next(err);
    }
}

const listaModelos = async (req, res, next) => {
    const data = JSON.parse(await readFile("car-list.json"));
    let brand = req.body.brand.toUpperCase()
    try {
        let getModels = data.filter(a => {
            if (a.brand.toUpperCase() === brand) {
                return a
            }
        }).map(a => a.models)
        console.log(getModels)
        res.send(getModels)
    } catch (err) {
        next(err);
    }
}

export {maisModelos, menosModelos, listaMaisModelos, listaMenosModelos, listaModelos}