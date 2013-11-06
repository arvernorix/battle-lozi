'use strict';

var HomeController = function () {

    app.get('/', function (req, res) {
        res.render('home/index');
    });

};

exports = module.exports = new HomeController();
