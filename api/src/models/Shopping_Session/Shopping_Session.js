const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("shoppingSession", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},

		total: {
			type: DataTypes.DECIMAL,
			defaultValue: 0.00,
			allowNull: false,
		},
	});
};
