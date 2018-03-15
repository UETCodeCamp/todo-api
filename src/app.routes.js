const express = require('express');
const router = express.Router();

const auth = require('./controllers/auth');
const todo = require('./controllers/todo');
const draft = require('./controllers/draft');

/**
 * Register routes.
 */
router.get('/', (req, res) => res.send('Hello todo app.'));
router.get('/ping', (req, res) => res.send('pong'));
router.get('/hi', (req, res) => res.send('Welcome UET Code Camp!'));

/**
 * Authentication
 */
router.post('/login', auth.login);
router.post('/register', auth.register);

/**
 * Todo
 */
router.post('/todos', auth.isAuthorized, todo.create);
router.get('/todos', auth.isAuthorized, todo.list);
router.get('/todos/:id', auth.isAuthorized, todo.detail);
router.put('/todos/:id', auth.isAuthorized, todo.update);
router.post('/todos/:id/toggle', auth.isAuthorized, todo.toggle);
router.delete('/todos/:id', auth.isAuthorized, todo.delete);

/**
 * Todo draft
 */
router.post('/draft', draft.create);
router.get('/draft', draft.list);
router.get('/draft/:id', draft.detail);
router.put('/draft/:id', draft.update);
router.post('/draft/:id/toggle', draft.toggle);
router.delete('/draft/:id', draft.delete);

/**
 * Exports.
 */
module.exports = router;