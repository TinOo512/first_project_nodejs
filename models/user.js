/**
 * Model User
 */
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', 
	{
		username: { 
			type: DataTypes.TEXT, 
			allowNull: false, 
			unique: true, 
			validate: { 
				notNull: true
			} 
		},
		email: { 
			type: DataTypes.TEXT, 
			allowNull: false, 
			unique: true, 
			validate: { 
				notNull: true,
				isEmail: true 
			} 
		},
		password: { 
			type: DataTypes.TEXT, 
			allowNull: false, 
			validate: { 
				notNull: true
			} 
		}
	}, 
	{
		classMethods: {
			checkPassword: function(pwd1, pwd2){ 
				if(pwd1 === pwd2) {
					return true;
				} else {
					return false;
				}
			}
		}
	});
};