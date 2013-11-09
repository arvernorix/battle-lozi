'use strict';

var HomeController = function () {

    app.get('/', function (req, res) {
        res.render('home/index');
    });

    app.io.sockets.on('connection', function (socket) {
        socket.emit('news', { message: 'Hello world!' });
        socket.on('other', function (data) {
            app.log.info(data);
        })
    });

};

exports = module.exports = new HomeController();
