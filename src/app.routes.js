const express = require('express');
const router = express.Router();

const {todo, auth} = require('./controllers');

/**
 * Register routes.
 */
router.get('/', (req, res) => res.send('Hello todo app.'));
router.get('/ping', (req, res) => res.send('pong'));
router.get('/hi', (req, res) => res.send('Welcome UET Code Camp!'));

router.post('/login', auth.login);
router.post('/register', auth.register);

router.post('/todos', auth.isAuthorized, todo.create);
router.get('/todos', auth.isAuthorized, todo.list);
router.get('/todos/:id', auth.isAuthorized, todo.detail);
router.put('/todos/:id', auth.isAuthorized, todo.update);
router.post('/todos/:id/toggle', auth.isAuthorized, todo.toggle);
router.delete('/todos/:id', auth.isAuthorized, todo.delete);

/**
 * Exports.
 */
module.exports = router;