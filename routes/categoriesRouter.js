const express = require('express');
const { faker, th } = require('@faker-js/faker');
const router = express.Router();

const categoriesService = require('../services/categoriesService');
const service = new categoriesService();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtiene una lista de categorías
 *     tags:
 *      - Categories
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       404:
 *        description: categorias no encontrada
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */


// endpoint para obtener categorías
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getAllCategories();
    if (!categories) {
      const error = new Error('Categories not found');
      error.status = 404;
      throw error;
    }
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags:
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *        description: categoria no encontrada por el id
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */


// endpoint para obtener una categoría por id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const categories = await service.getByIdCategories(id);
    if (!categories) {
      const error = new Error('Categories not found');
      error.status = 404;
      throw error;
    }
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags:
 *      - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *        description: categoria no creada
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
    const newCategorie = await service.createCategorie(body);
    // condicio para validar si la categoría no se creo bien
    if (!newCategorie) {
      const error = new Error('Brand not created');
      error.status = 400;
      throw error;
    }

    res.status(201).json(newCategorie);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualiza una categoría por ID
 *     tags:
 *      -  Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       400:
 *        description: categoria no actualizada
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

    const categories = await service.updateCategorie(id, body);
    // condicion para validar si la categoría no se actualizo
    if (!categories) {
      const error = new Error('Categorie not updated');
      error.status = 400;
      throw error;
    }
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Elimina una categoría por ID
 *     tags:
 *      - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       400:
 *        description: categoria no eliminada
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

    const categories = await service.deleteCategorie(id);
    // condicion para validar si la categoría no se elimino
    if (!categories) {
      const error = new Error('Categorie not deleted');
      error.status = 400;
      throw error;
    }
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
