if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
(function (define) {
    define([
        'sequelize'
    ], function (Sequelize) {
        var sequelize = {
                instance: null,
                models: null,
                
                init: function(force){
                    //initialisation de la connection à la bdd
                    this.instance = new Sequelize('farm2war_dev', 'root', 'admin', {
                        host: 'localhost',
                        port: 5432,
                        dialect: 'postgres',
                        syncOnAssociation: false,
                        define: {
                            underscored: true
                        }
                    });
                    //chargement des models
                    this.models = {
                            'player': this.instance.import(__dirname + '/../models/player'), 
                            'user': this.instance.import(__dirname + '/../models/user')
                    };
                    //ajout des associations
                    this.models.user.hasOne(this.models.player);
                    //synchronisation avec la bdd
                    //{force: true} will drop the table first and re-create it afterwards
                    this.instance.sync({force: force}).error(function(error) {
                        throw new Error('Error Sequelize sync');
                    });
                }
        };
        return sequelize;
    });
})(typeof define != "undefined" ? define : function () {
    var result = arguments[arguments.length - 1]();
    if ("undefined" != typeof(result)) {
        module.exports = result;
    }
});