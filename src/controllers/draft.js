const TodoDraftActions = require('../actions/TodoDraft');
const {sendError, sendSuccess} = require("../helpers/response");

exports.list = (req, res) => {
    const defaultArgs = {
        page: 1,
        limit: 20
    };

    const {complete, page, limit} = Object.assign({}, defaultArgs, req.query);

    let queries = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };
    if (complete !== undefined) {
        queries = Object.assign({}, queries, {
            complete: !!parseInt(complete, 10)
        });
    }

    TodoDraftActions.getListTodo({queries})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.detail = (req, res) => {
    const todoId = req.params['id'];

    TodoDraftActions.detail({todoId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.create = (req, res) => {
    const defaultArgs = {
        title: ''
    };

    const {title} = Object.assign({}, defaultArgs, req.body);

    TodoDraftActions.create({title})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.update = (req, res) => {
    const todoId = req.params['id'];

    const defaultArgs = {
        title: ''
    };
    const {title} = Object.assign({}, defaultArgs, req.body);

    TodoDraftActions.update({todoId, postData: {title}})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.delete = (req, res) => {
    const todoId = req.params['id'];

    TodoDraftActions.delete({todoId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};

exports.toggle = (req, res) => {
    const todoId = req.params['id'];

    TodoDraftActions.toggleComplete({todoId})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};