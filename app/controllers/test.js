'use strict';

var TestController = function () {

    app.get('/test', function (req, res) {
        res.render('test/index', {
            title: 'Test'
        });
    });

    app.get('/test2', function (req, res) {
        res.render('test/index2', {
            title: 'Test2'
        });
    });

};

exports = module.exports = new TestController();
