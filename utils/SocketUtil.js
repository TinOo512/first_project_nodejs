if (typeof define !== 'function') {
    var define = (require('amdefine'))(module);
}
(function (define) {
    define(['../config/sequelize'
            ], function (sequelize) {
        var self = {
            client: {},
            player: {},
            
            connection: function (socket) {
                console.log("<connection>");
                self.client[socket.id] = socket;
                socket.on('disconnect', function () {
                    console.log("<disconnect>");
                    delete self.client[socket.id];
                    // persistence du player en bdd
                    self.player[socket.id].save(['x', 'y'])
                        .success(function(anotherTask) {
                        })
                        .error(function(error) {
                            console.log(error);
                        });
                    
                });
            }
        };
        return self;
    });
})(typeof define != "undefined" ? define : function () {
    var result = arguments[arguments.length - 1]();
    if ("undefined" != typeof(result)) {
        module.exports = result;
    }
});