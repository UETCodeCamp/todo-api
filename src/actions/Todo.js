const Todo = require('../models/Todo');

exports.getListTodo = ({userId, queries}) => {
    const {page, limit, completed} = queries;
    const skip = (page - 1) * limit;

    let find = {
        owner: userId
    };
    if (typeof completed === 'boolean') {
        find = Object.assign({}, find, {
            completed
        });
    }

    return Todo.find(find).skip(skip).limit(limit);
};

exports.detail = ({userId, todoId}) => {
    return Todo.findOne({
        _id: todoId,
        owner: userId
    }).then(todo => {
        if (!todo) {
            throw new Error('Todo not found.');
        }

        return Promise.resolve(todo);
    });
};

exports.create = ({userId, title}) => {
    const todo = new Todo({
        owner: userId,
        title,
    });

    return todo.save();
};

exports.update = ({userId, todoId, postData}) => {
    const updated = Object.assign({}, postData, {
        updated: Date.now()
    });

    return Todo.updateOne({
        _id: todoId,
        owner: userId,
    }, {
        $set: updated
    }).then(() => {
        return Todo.findById(todoId);
    });
};

exports.delete = ({userId, todoId}) => {
    return Todo.remove({
        _id: todoId,
        owner: userId
    });
};

exports.toggleComplete = ({userId, todoId}) => {
    return Todo.findOne({
        _id: todoId,
        owner: userId
    }).then(todo => {
        if (!todo) {
            throw new Error('Todo not found.');
        }

        return todo.update({
            $set: {
                completed: !todo.get('completed')
            }
        }).then(() => {
            return Todo.findById(todoId);
        });
    });
};