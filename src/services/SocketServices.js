const socketIO = require('socket.io');

let _io = null;

exports.setup = (server) => {
    _io = socketIO(server);
};

exports.io = () => {
    return _io;
};