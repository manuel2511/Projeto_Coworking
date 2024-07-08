import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllReservations, deleteReservation } from "../../services/reservationService";
import { getAllPaymentConditions } from '../../services/paymentConditionService';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import "./ReservationList.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservationId, setSelectedreservationId] = useState(null);
  const [paymentConditions, setPaymentConditions] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsResponse = await getAllReservations();
        const paymentConditionsResponse = await getAllPaymentConditions();

        setReservations(reservationsResponse.data);
        setPaymentConditions(paymentConditionsResponse.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao buscar reservas ou condições de pagamento'
        });
      }
    };

    fetchData();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  const handleReopen = (reservationId) => {
    setSelectedreservationId(reservationId);
    navigate(`/cadastroReserva/${reservationId}`);
  };

  const handleCancel = async (reservationID) => {
    const isConfirmed = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você realmente deseja cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: 'true',
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim'
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      await deleteReservation(reservationID);
      const updatedReservations = reservations.map(reservation => {
        if (reservation.id === reservationID) {
          return { ...reservation, cancelled: true };
        }
        return reservation;
      });
      setReservations(updatedReservations);
      setCancelledReservations([...cancelledReservations, reservationID]);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Reserva cancelada com sucesso!'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao cancelar reserva.'
      });
    }
  };

  const getPaymentConditionName = (id) => {
    const condition = paymentConditions.find(condition => condition.id === id);
    return condition ? condition.name : "Desconhecido";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedDate = date.toLocaleDateString(undefined, optionsDate);
    const formattedTime = date.toLocaleTimeString(undefined, optionsTime);
    return `${formattedDate} às ${formattedTime}`;
  };

  return (
    <>
      <body className="">
        <Header onToggleSidebar={toggleSidebar} />
        <NavBar isOpen={isSidebarOpen} />
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
          <div className="reservations-container">
            {reservations.map((reservation) => (
              <div className={`reservation-card ${reservation.cancelled ? 'cancelled' : ''}`} key={reservation.id}>
                <p className="id">ID: {reservation.id} </p>
                <p>{formatDate(reservation.date)}</p>
                <p className="payment-method">
                  Método de Pagamento: {getPaymentConditionName(reservation.paymentConditionId)}
                </p>
                <p>Horas Reservadas: {reservation.duration} {reservation.duration === 1 ? "Hora" : "Horas"}</p>
                <p className="totalValue">Valor Total: R${reservation.totalValue}</p>
                <ul className="products-list">
                  {reservation.Products.map((product) => (
                    <li className="product-item" key={product.id}>
                      <p className="product-name">Produto: {product.name}</p>
                      <p className="hourly-rate">Valor por Hora: R${product.hourlyRate}</p>
                    </li>
                  ))}
                </ul>
                <hr />
                <div className="reservation-footer">
                  <div className="reservation-buttons">
                    {/*<button className="reservation-reopen-button" onClick={() => handleReopen(reservation.id)}>Reagendar</button>*/}
                    {reservation.cancelled ? (
                      <button className="reservation-cancel-button cancelled" disabled>Cancelado</button>
                    ) : (
                      <button className="reservation-cancel-button" onClick={() => handleCancel(reservation.id)}>Cancelar</button>
                    )}
                  </div>
                </div>
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