import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllReservations } from "../../services/reservationService";

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
          <div>
            <ul>
              {reservations.map((reservation) => (
                <li key={reservation.id}>
                  <p>Método de Pagamento: {reservation.paymentMethod}</p>
                  <p>Valor Total: {reservation.totalAmount}</p>
                  <ul>
                    {reservation.Products.map((product) => (
                      <li key={product.id}>
                        <p>Produto: {product.name}</p>
                        <p>
                          Horas Reservadas: {product.hoursReserved}
                        </p>
                        <p>Valor por Hora: {product.hourlyRate}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
};

export default ReservationList;
