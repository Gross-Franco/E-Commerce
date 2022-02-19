const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("shoppingSession", {
		total: {
			type: DataTypes.DECIMAL,
			defaultValue: 0.00,
			allowNull: false,
		},
	});
};
