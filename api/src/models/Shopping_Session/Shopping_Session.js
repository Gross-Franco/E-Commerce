const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("shoppingSession", {
		total: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			DefaultValue: 0.00,
		},
	});
};
