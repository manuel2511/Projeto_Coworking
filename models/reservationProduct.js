module.exports = (sequelize, DataTypes) => {
    const ReservationProduct = sequelize.define('ReservationProduct', {
      hoursReserved: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return ReservationProduct;
  };