const TodoDraft = require('../models/TodoDraft');

exports.getListTodo = ({queries}) => {
    const {page, limit, complete} = queries;
    const skip = (page - 1) * limit;

    let find = {};
    if (typeof complete === 'boolean') {
        find = Object.assign({}, find, {
            complete
        });
    }

    return TodoDraft.find(find).skip(skip).limit(limit);
};

exports.detail = ({todoId}) => {
    return TodoDraft.findOne({
        _id: todoId
    }).then(todo => {
        if (!todo) {
            throw new Error('Todo not found.');
        }

        return Promise.resolve(todo);
    });
};

exports.create = ({title}) => {
    const todo = new TodoDraft({
        title,
    });

    return todo.save();
};

exports.update = ({todoId, postData}) => {
    const updated = Object.assign({}, postData, {
        updated: Date.now()
    });

    return TodoDraft.updateOne({
        _id: todoId,
    }, {
        $set: updated
    }).then(() => {
        return TodoDraft.findById(todoId);
    });
};

exports.delete = ({todoId}) => {
    return TodoDraft.remove({
        _id: todoId
    });
};

exports.toggleComplete = ({todoId}) => {
    return TodoDraft.findOne({
        _id: todoId
    }).then(todo => {
        if (!todo) {
            throw new Error('Todo not found.');
        }

        return todo.update({
            $set: {
                complete: !todo.get('complete')
            }
        }).then(() => {
            return TodoDraft.findById(todoId);
        });
    });
};