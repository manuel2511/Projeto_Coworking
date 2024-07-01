// models/Reservation.js
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define("Reservation", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Aberta", "Cancelada", "Finalizada"),
      defaultValue: "Aberta",
    },
    repeat: {
      type: DataTypes.ENUM("None", "Daily", "Weekly", "Monthly"),
      defaultValue: "None",
    },
    repeatCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalValue: {
      type: DataTypes.DECIMAL(10, 2),

    },
    userId: {
      type: DataTypes.INTEGER,

    },
    paymentConditionId: {
      type: DataTypes.INTEGER,

    },
  });

  Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId' });
    Reservation.belongsTo(models.PaymentCondition, { foreignKey: 'paymentConditionId' });
  };

  return Reservation;
};
