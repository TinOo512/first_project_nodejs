/**
 * Controleur application
 */
if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}

(function (define) {
    define([
    ], function () {
        var Controller = {           
            engine:'ejs',
            
            /**
             * Middleware before verifiant que l'utilisateur est connecté
             */
            before:function (req, res, next) {
                if (req.session.user) {
                    res.locals.user = req.session.user;
                    next();
                } else {
                    res.redirect('/login');
                }
            }
        };
        return Controller;
    });

})(typeof define != "undefined" ? define : function () {
    var result = arguments[arguments.length - 1]();
    if ("undefined" != typeof(result)) {
        module.exports = result;
    }
});