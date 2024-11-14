const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

const brandService = require('../services/brandsService');
const service = new brandService();

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtiene una lista de marcas
 *     tags:
 *      - Brands
 *     responses:
 *       200:
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   brandName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       404:
 *         description: Marcas no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// endpoint para obtener marcas
router.get('/', async (req, res, next) => {
  try {
    const brands = await service.getAllBrands();
    if (!brands) {
      const error = new Error('Brands not found');
      error.status = 404;
      throw error;
    }
    res.json(brands);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtiene una marca por ID
 *     tags:
 *      - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brandName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *        description: Marca no encontrada
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

// endpoint para obtener una marca por id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await service.getByIdBrand(id);
    if (!brand) {
      const error = new Error('Brand not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crea una nueva marca
 *     tags:
 *      - Brands
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Marca creada
 *       400:
 *        description: Marca no creada
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const brand = await service.createBrand(body);
    // condicion para validar si el brand no se creo
    if (!brand) {
      const error = new Error('Brand not created');
      error.status = 400;
      throw error;
    }
    res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualiza una marca por ID
 *     tags:
 *      - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Marca actualizada
 *       400:
 *        description: Marca no actualizada
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const brand = await service.updateBrand(id, body);

    // condicion para validar si el brand no se actualizo
    if (!brand) {
      const error = new Error('Brand not updated');
      error.status = 400;
      throw error;
    }
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Elimina una marca por ID
 *     tags:
 *      - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la marca
 *     responses:
 *       200:
 *         description: Marca eliminada
 *       400:
 *        description: Marca no eliminada
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const brand = await service.deleteBrand(id, body);

    // condicion para validar si el brand no se elimino
    if (!brand) {
      const error = new Error('Brand not updated');
      error.status = 400;
      throw error;
    }
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
