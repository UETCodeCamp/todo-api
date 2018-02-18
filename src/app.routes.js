const express = require('express');
const router = express.Router();

const {todo, auth} = require('./controllers');

/**
 * Register routes.
 */
router.get('/', (req, res) => res.send('Hello todo app.'));
router.get('/ping', (req, res) => res.send('pong'));

router.post('/login', auth.login);
router.post('/register', auth.register);

router.put('/todo', auth.isAuthorized, todo.create);
router.get('/todo', auth.isAuthorized, todo.list);
router.get('/todo/:id', auth.isAuthorized, todo.detail);
router.post('/todo/:id', auth.isAuthorized, todo.update);
router.post('/todo/:id/toggle', auth.isAuthorized, todo.toggle);
router.delete('/todo/:id', auth.isAuthorized, todo.delete);

/**
 * Exports.
 */
module.exports = router;