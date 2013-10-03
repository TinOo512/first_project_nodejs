/**
 * Model Player
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('player', 
    {
        x: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            validate: { 
                notNull: true
            } 
        },
        y: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            validate: { 
                notNull: true
            } 
        },
        socket_id: { 
            type: DataTypes.TEXT, 
            allowNull: false, 
            validate: { 
                notNull: true
            } 
        }
    });
};