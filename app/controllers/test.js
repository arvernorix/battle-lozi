'use strict';

var TestController = function () {

    app.get('/test', function (req, res) {
        res.render('test/index', {
            title: 'Test'
        });
    });

};

exports = module.exports = new TestController();
