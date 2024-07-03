const { Reservation, Product, User, PaymentCondition,ReservationProducts } = require('../models');

exports.create = async (req, res) => {
  try {
    const { userId, date, duration, products, repeat,repeatCount, status, paymentConditionId,totalValue } = req.body;
    const reservation = await Reservation.create({ userId, date, duration,repeat,repeatCount, status, paymentConditionId,totalValue });
    // Adicionar produtos à reserva
    for (const product of products) {
      await ReservationProducts.create({
        reservationId: reservation.id,
        productId: product.id
      });
    }
    countRepeat = parseInt(repeatCount)
    // Lógica de repetição de reservas
    if (repeat !== 'None') {
      const repeatCount = countRepeat;
      const repeatInterval = repeat; // daily, weekly, monthly
      for (let i = 1; i <= repeatCount; i++) {
        let newDate = new Date(date);
        if (repeatInterval === 'Weekly') {
          newDate.setDate(newDate.getDate() + 7 * i);
        } else if (repeatInterval === 'Monthly') {
          newDate.setMonth(newDate.getMonth() + i);
        } else {
          newDate.setDate(newDate.getDate() + i);
        }
        const NewRepeatId = reservation.id;
        const repeatedReservation = await Reservation.create({ userId, date: newDate, duration,repeat,repeatCount,repeatId: NewRepeatId, status, paymentConditionId, totalValue });
        // Adicionar produtos às reservas repetidas
        for (const product of products) {
          await ReservationProducts.create({
            reservationId: repeatedReservation.id,
            productId: product.id 
          });
        }
      }
    }

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({ include: Product });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByPk(id, { include: Product });
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { products, paymentMethod } = req.body;
  let totalAmount = 0;

  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    reservation.paymentMethod = paymentMethod;
    await reservation.setProducts([]); // Remove produtos antigos

    for (const product of products) {
      const foundProduct = await Product.findByPk(product.id);
      if (foundProduct) {
        const amount = foundProduct.hourlyRate * product.hoursReserved;
        totalAmount += amount;

        await reservation.addProduct(foundProduct, {
          through: { hoursReserved: product.hoursReserved },
        });
      }
    }

    reservation.totalAmount = totalAmount;
    await reservation.save();

    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reservation.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
