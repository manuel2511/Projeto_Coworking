module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Reservation.associate = (models) => {
      Reservation.belongsToMany(models.Product, { through: 'ReservationProducts' });
    };
  
    return Reservation;
  };
  