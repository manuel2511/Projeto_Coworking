import React, { useEffect, useState } from "react";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import { getAllReservations, deleteReservation } from "../../services/reservationService";
import editImage from '../../assets/img/edit.png';
import deleteImage from '../../assets/img/delete.png';
import "./ReservationList.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [setSelectedreservationId] = useState(null);
  const navigate = useNavigate();
  
  

  
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

  // criar aba de editar reserva pois não tem
  const handleEdit = (reservationId) => {
    setSelectedreservationId(reservationId);
    navigate(`/cadastroReserva/${reservationId}`); 
  };

  //botão dedeletar
  const handleDelete = async(reservationID) => {
    try {
      await deleteReservation(reservationID);  // Chama a função do rervationService para enviar a requisição (delete)
      // Atualize a lista de reservas após deletar
      const updatedReservation = reservations.filter(reservation => reservation.id !== reservationID);  // updatedreservation = novo array com todas as reservas restantes
      setReservations(updatedReservation);
      alert("Reserva deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar reserva.");
    }
  };





  //função para formataçõa da data
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
                {/* alinhar id e botões */}
                <div className="reservation-top"> 
                <p className="id">ID: {reservation.id} </p>
                <div className="reservation-buttons">
                  {/* botão de editar */}
                <button className="reservation-edit-button" onClick={() => handleEdit(reservation.id)}>
                  <img src={editImage} />
                </button>
                {/* botão de deletar */}
                <button className="reservation-delete-button" onClick={() => handleDelete(reservation.id)}>
                  <img src={deleteImage} />
                </button>
                </div>
                </div>
                <p >{formatDate(reservation.date)} </p>
                <p className="payment-method">
                  Método de Pagamento: {reservation.paymentMethod}
                </p>
                <p>Horas Reservadas: {reservation.duration} {reservation.duration === 1 ? "Hora" : "Horas"}</p>
                <p className="otalValue">Valor Total: {reservation.totalValue}</p>
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
