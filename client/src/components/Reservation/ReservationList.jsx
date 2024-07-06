import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllReservations, deleteReservation } from "../../services/reservationService";
import { getAllPaymentConditions } from '../../services/paymentConditionService';
import "./ReservationList.css";
import { useNavigate } from "react-router-dom";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservationId, setSelectedreservationId] = useState(null);
  const [paymentConditions, setPaymentConditions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsResponse = await getAllReservations();
        const paymentConditionsResponse = await getAllPaymentConditions();
        
        setReservations(reservationsResponse.data);
        setPaymentConditions(paymentConditionsResponse.data);
      } catch (error) {
        alert("Erro ao buscar reservas ou condições de pagamento");
      }
    };

    fetchData();
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
      document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
    };
  // criar aba de editar reserva pois não tem
  const handleReopen = (reservationId) => {
    setSelectedreservationId(reservationId);
    navigate(`/cadastroReserva/${reservationId}`); 
  };

  //botão dedeletar
  const handleCancel = async(reservationID) => {
    try {
      await deleteReservation(reservationID);  // Chama a função do rervationService para enviar a requisição (delete)
      // Atualize a lista de reservas após deletar
      const updatedReservations = reservations.filter(reservation => reservation.id !== reservationID);  // updatedreservation = novo array com todas as reservas restantes
      setReservations(updatedReservations);
      alert("Reserva deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar reserva.");
    }
  };

  const getPaymentConditionName = (id) => {
    const condition = paymentConditions.find(condition => condition.id === id);
    return condition ? condition.name : "Desconhecido";
  };

  //função para formataçõa da data
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
          {/* <!-- End Page Title --> */}
          <div className="reservations-container">
            {reservations.map((reservation) => (
              <div className="reservation-card" key={reservation.id}>
                <p className="id">ID: {reservation.id} </p>
                <p >{formatDate(reservation.date)} </p>
                <p className="payment-method">
                  Método de Pagamento:  {getPaymentConditionName(reservation.paymentConditionId)}
                </p>
                <p>Horas Reservadas: {reservation.duration} {reservation.duration === 1 ? "Hora" : "Horas"}</p>
                <p className="totalValue">Valor Total: {reservation.totalValue}</p>
                <ul className="products-list">
                  {reservation.Products.map((product) => (
                    <li className="product-item" key={product.id}>
                      <p className="product-name">Produto: {product.name}</p>
                      <p className="hourly-rate">Valor por Hora: R${product.hourlyRate}</p>
                    </li>
                  ))}
                </ul>
                <hr/>
                {/* alinhar id e botões */}
                <div className="reservation-footer"> 
                  <div className="reservation-buttons">
                    {/* botão de reagendar */}
                    <button className="reservation-reopen-button" onClick={() => handleReopen(reservation.id)}>Reagendar</button>
                    {/* botão de cancelar */}
                    <button className="reservation-cancel-button" onClick={() => handleCancel(reservation.id)}>Cancelar</button>
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
