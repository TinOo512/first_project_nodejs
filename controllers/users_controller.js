/**
 * Controleur gerant toute la gestion des utilisateurs
 */
if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}

(function (define) {
    define([
        './application_controller',
        'crypto', 
        '../config/sequelize'
    ], function (parent, crypto, sequelize) {
        var Controller = {
            /**
             * GET --> methode signin
             */
            signin:function (req, res) {
                res.render('signin');
            },
            
            /**
             * POST --> traitement du formulaire de creation de compte
             */
            signinForm:function (req, res) {
                console.log(sequelize.models);
                var User = sequelize.models.user;

                var user = User.build({ username: req.body.username, 
                    email: req.body.email,
                    password: crypto.createHash('sha1').update(req.body.password1).digest("hex")
                });
                var errors = user.validate();
                // Gestion de l'erreur lorsque les deux pwd ne sont pas identiques
                if(!User.checkPassword(req.body.password1, req.body.password2)) {
                    if(typeof(errors['password']) == 'undefined') {
                        errors['password'] = {'password':new Array('doesn\'t match confirmation')};
                    } else {
                        errors['password'].push('doesn\'t match confirmation');
                    }
                }
				if (errors) {
					res.locals.errors = errors;
					res.render('signin');
				} else {
				    user.save().success(function(anotherTask) {
				        res.locals.success = "user create with success";
				        res.render('signin');
			        }).error(function(error) {
			            res.locals.error = error;
			            res.render('signin');
		            });
				}
            },
            
            /**
             * GET --> methode login
             */
            login:function (req, res) {
                res.render('login');
            },
            
            /**
             * POST --> traitement du formulaire de connection
             */
            loginForm:function (req, res) {
                var User = sequelize.models.user;

                User.find({
                    where: {email: req.body.email, password: crypto.createHash('sha1').update(req.body.password).digest("hex")},
                    attributes: ['id', 'username', 'email']
                }).success(function(user) {
                    if (user) {
                        req.session.regenerate(function(){
                            req.session.user = user;
                            res.redirect('/');
                        });
                    } else {
                        res.locals.error = "Email or Password are not good";
                        res.render('login');
                    }
                });
            },
        
	        logout:function (req, res) {
	            req.session.destroy(function(){
	                res.redirect('/');
                });
	        }
        };
        Controller.__proto__ = parent;
        return Controller;
    });

})(typeof define != "undefined" ? define : function () {
    var result = arguments[arguments.length - 1]();
    if ("undefined" != typeof(result)) {
        module.exports = result;
    }
});