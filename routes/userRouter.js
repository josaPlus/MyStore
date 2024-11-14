const express = require("express");
const router = express.Router();

const usersService = require('../services/usersService');
const service = new usersService();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   description:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       404:
 *        description: usuarios no encontrados
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */


// endpoint para obtener usuarios
router.get('/', async (req, res, next) => {
  try {
    const users = await service.getAllUsers();
    if(!users) {
      const error = new Error('Users not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json(users);
  } catch(error) {
    next(error)
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 userName:
 *                   type: string
 *                 description:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *        description: usuario no encontrado
 *        content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */


// endpoint para obtener un usuario por id
router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const users = await service.getByIdUsers(id);
    if (!users) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }
    res.status(200).json(users);
  } catch(error) {
    next(error)
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *      - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *        description: usuario no creado
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
    const user = await service.createUser(body);
    if (!user) {
      const error = new Error('User not created');
      error.status = 400;
      throw error;
    }
    res.status(201).json(user);
  } catch(error) {
    next(error)
  }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualiza un usuario por ID
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado
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
    const {id} = req.params;
    const body = req.body;

    const user = await service.updateUser(id, body);
    if (!user) {
      const error = new Error('User not updated');
      error.status = 400;
      throw error;
    }
    res.status(200).json(user);
  } catch(error) {
    next(error)
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *        description: usuario no eliminado
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
    const {id} = req.params;
    const user = await service.deleteUser(id);
    if (!user) {
      const error = new Error('User not deleted');
      error.status = 400;
      throw error;
    }
    res.status(200).json(user);
  } catch(error) {
    next(error)
  }
});



module.exports = router;
