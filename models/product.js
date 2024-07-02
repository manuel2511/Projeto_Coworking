module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observation: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.STRING,
    },
    hourlyRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Reservation, {
      through: models.ReservationProducts,
      foreignKey: 'productId',
      otherKey: 'reservationId',
    });
  };
  return Product;
};
