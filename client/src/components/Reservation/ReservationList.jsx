import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllReservations } from "../../services/reservationService";
import editImage from '../../assets/img/edit.png';
import deleteImage from '../../assets/img/delete.png';
import "./ReservationList.css"; // Import the CSS file

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response.data);
      } catch (error) {
        alert("Erro ao buscar reservas");
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <>
      <body className="">
        <Header />
        <NavBar />
        <main id="main" className="main">
          <div className="">
            <h1>Listagem de Reservas</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">Movimentações</li>
                <li className="breadcrumb-item active">Listagem de Reservas</li>
              </ol>
            </nav>
          </div>
          {/* <!-- End Page Title --> */}
          <div className="reservations-container">
            {reservations.map((reservation) => (
              <div className="reservation-card" key={reservation.id}>
                <p className="id">ID: {reservation.id} </p>
                <p >{formatDate(reservation.date)} </p>
                <p className="payment-method">
                  Método de Pagamento: {reservation.paymentMethod}
                </p>
                <p>Horas Reservadas: {reservation.duration} {reservation.duration === 1 ? "Hora" : "Horas"}</p>
                <p className="totalValue">Valor Total: {reservation.totalValue}</p>
                <ul className="products-list">
                  {reservation.Products.map((product) => (
                    <li className="product-item" key={product.id}>
                      <p className="product-name">Produto: {product.name}</p>
                      <p className="hourly-rate">Valor por Hora:R$ {product.hourlyRate}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default ReservationList;
