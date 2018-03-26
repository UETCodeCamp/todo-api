const TodoActions = require('../actions/Todo');
const {catchError, sendSuccess} = require("../helpers/response");

exports.list = (req, res) => {
    const userId = req['userId'];

    const defaultArgs = {
        page: 1,
        limit: 10
    };

    const {completed, page, limit} = Object.assign({}, defaultArgs, req.query);

    let queries = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };
    if (completed !== undefined) {
        queries = Object.assign({}, queries, {
            completed: !!parseInt(completed, 10)
        });
    }

    TodoActions.getListTodo({userId, queries})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.detail = (req, res) => {
    const userId = req['userId'];
    const todoId = req.params['id'];

    TodoActions.detail({userId, todoId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.create = (req, res) => {
    const userId = req['userId'];

    const defaultArgs = {
        title: ''
    };

    const {title} = Object.assign({}, defaultArgs, req.body);

    TodoActions.create({userId, title})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.update = (req, res) => {
    const userId = req['userId'];
    const todoId = req.params['id'];

    const defaultArgs = {
        title: ''
    };
    const {title} = Object.assign({}, defaultArgs, req.body);

    TodoActions.update({userId, todoId, postData: {title}})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.delete = (req, res) => {
    const userId = req['userId'];
    const todoId = req.params['id'];

    TodoActions.delete({userId, todoId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};

exports.toggle = (req, res) => {
    const userId = req['userId'];
    const todoId = req.params['id'];

    TodoActions.toggleComplete({userId, todoId})
        .then(sendSuccess(req, res))
        .catch(catchError(req, res));
};