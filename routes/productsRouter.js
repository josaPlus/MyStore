const express = require('express');
// const { faker } = require('@faker-js/faker'); // Usar la nueva versión
// const { app } = require('faker/lib/locales/en');
const router = express.Router();

const productService = require('../services/productsService');
const service = new productService();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene una lista de productos
 *     tags:
 *      - Products
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stoke:
 *                     type: boolean
 *                   categoryId:
 *                     type: number
 *                   brandId:
 *                     type: number
 *                   imagenUrl:
 *                     type: string
 *       404:
 *        description: productos no encontradas
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

// endpoint para obtener productos
router.get('/', async (req, res, next) => {
  try {
    const products = await service.getAll();
    // condiciones para validar si no hay productos
    if (!products) {
      const error = new Error('Products not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *    get:
 *     summary: Obtiene un producto por ID
 *     tags:
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stoke:
 *                   type: boolean
 *                 categoryId:
 *                   type: number
 *                 brandId:
 *                   type: number
 *                 imagenUrl:
 *                   type: string
 *       404:
 *        description: producto no encontrada por id
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */

// endpoint para obtener un producto por id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.getById(id);
    // condicion para validar si no hay producto con su id
    if (!products) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products:
 *    post:
 *      summary: Crea un nuevo producto
 *      tags:
 *       - Products
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                productName:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                stock:
 *                  type: boolean
 *                categoryId:
 *                  type: number
 *                brandId:
 *                  type: number
 *                imagenUrl:
 *                  type: string
 *      responses:
 *        201:
 *          description: producto creado
 *        400:
 *          description: producto no creado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 */

// endpoint para agregar un producto
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const product = await service.create(body);
    // condicion para validar si el producto no se creo
    if (!product) {
      const error = new Error('Product not created');
      error.status = 400;
      throw error;
    }
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualiza un producto por ID
 *     tags:
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: boolean
 *               categoryId:
 *                 type: number
 *               brandId:
 *                 type: number
 *               imagenUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *        description: producto no actualizada
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

    const product = await service.update(id, body);
    // condicion para validar si el producto no se actualizo
    if (!product) {
      const error = new Error('Product not updated');
      error.status = 400;
      throw error;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags:
 *      - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *        description: producto no eliminado
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
    const product = await service.delete(id);
    // condicion para validar si el producto no se elimino
    if (!product) {
      const error = new Error('Product not deleted');
      error.status = 400;
      throw error;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// tarea que es asincronizmo
// el async y await es para que espere a que se resuelva la tarea asincrona para que siga con el codigo
