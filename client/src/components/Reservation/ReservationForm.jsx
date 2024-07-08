import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import "./ReservationForm.css";
import { getUserInfo } from '../User/auth';
import RemoveImageButton from '../../assets/img/remove.png';
import Swal from 'sweetalert2'; // Importar o SweetAlert2

const ReservationForm = () => {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [status, setStatus] = useState("Aberta");
  const [repeat, setRepeat] = useState("None");
  const [repeatCount, setRepeatCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const [paymentConditionId, setPaymentConditionId] = useState("");
  const [paymentConditions, setPaymentConditions] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    axios.get("/products").then((response) => {
      setProducts(response.data);
    });

    axios.get("/payment-conditions").then((response) => {
      setPaymentConditions(response.data);
    });
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle('toggle-sidebar', !isSidebarOpen);
  };

  const handleAddProduct = () => {
    // Verifica se o espaço está preenchido
    if (!selectedProduct) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, selecione pelo menos um espaço antes de continuar a reserva.'
      });
      return;
    }

    // Verifique se a duração em horas está preenchida
    if (!duration) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, selecione a duração de tempo em horas antes de continuar a reserva.'
      });
      return;
    }

    // Verifica se a data está preenchida
    if (!date) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, selecione uma data antes de continuar a reserva.'
      });
      return;
    }

    // Verifica se o usuário selecionou uma condição de pagamento
    if (!paymentConditionId) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, selecione uma condição de pagamento antes de continuar a reserva.'
      });
      return;
    }

    const product = products.find((p) => p.id === parseInt(selectedProduct));
    const paymentCondition = paymentConditions.find((pc) => pc.id === parseInt(paymentConditionId));

    if (product && paymentCondition) {
      const productTotal = product.hourlyRate * duration;
      setAddedProducts([
        ...addedProducts,
        { 
          ...product, 
          quantity: duration, 
          total: productTotal, 
          paymentConditionName: paymentCondition.name
        },
      ]);
      setTotalValue(totalValue + productTotal);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      date,
      duration,
      status,
      repeat,
      repeatCount,
      products: addedProducts,
      paymentConditionId,
      totalValue,
      userId: user.id, // Assumindo que o user já está logado
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/reservations", reservationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Reserva criada com sucesso!'
      });

      // Limpar campos após submissão bem-sucedida
      setDate("");
      setDuration(1);
      setStatus("Aberta");
      setRepeat("None");
      setRepeatCount(0);
      setSelectedProduct("");
      setAddedProducts([]);
      setPaymentConditionId("");
      setTotalValue(0);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar reserva'
      });
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(parseInt(value)) && parseInt(value) > 0)) {
      setDuration(parseInt(value));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, digite um número positivo para a duração de tempo.'
      });
    }
  };

  const handleRepeatCountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(parseInt(value)) && parseInt(value) >= 0)) {
      setRepeatCount(parseInt(value));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, digite um número maior ou igual a zero para a quantidade de repetições.'
      });
    }
  };

  const handleRemoveProduct = (indexToRemove) => {
    const updatedProducts = [...addedProducts];
    const removedProduct = updatedProducts.splice(indexToRemove, 1);
    setAddedProducts(updatedProducts);
    setTotalValue(totalValue - removedProduct[0].total);
  };
  
  const user = getUserInfo();

  if (!user) {
    return <p>User not logged in</p>;
  }
    
  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <NavBar isOpen={isSidebarOpen} />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <h1>Cadastro de Reservas</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Cadastro</li>
              <li className="breadcrumb-item active">Cadastro de Reserva</li>
            </ol>
          </nav>
        </div>
        
        <div className="reservation-form-wrapper">
          <div className="reservation-form-container"> 
            <form className="reservation-form-grid">
              <h2>Detalhes da Reserva</h2>
              <div className="reservation-form-group">
                <label>Data</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="reservation-form-group">
                <label>Duração (horas)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={handleDurationChange}
                  required
                />
              </div>
              <div className="reservation-form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Aberta">Aberta</option>
                  {/*<option value="Cancelada">Cancelada</option>
                  <option value="Finalizada">Finalizada</option>*/}
                </select>
              </div>
              <div className="reservation-form-group">
                <label>Repetir</label>
                <select
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                >
                  <option value="None">Nunca</option>
                  <option value="Daily">Diariamente</option>
                  <option value="Weekly">Semanalmente</option>
                  <option value="Monthly">Mensalmente</option>
                </select>
              </div>
              <div className="reservation-form-group">
                <label>Repetir quantas vezes?</label>
                <input
                  type="number"
                  value={repeatCount}
                  onChange={handleRepeatCountChange}
                />
              </div>
              <div className="reservation-form-group">
                <label>Condição de Pagamento</label>
                <select
                  value={paymentConditionId}
                  onChange={(e) => setPaymentConditionId(parseInt(e.target.value))}
                  required
                >
                  <option value="">Selecione uma condição de pagamento</option>
                  {paymentConditions.map((condition) => (
                    <option key={condition.id} value={condition.id}>
                      {condition.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="reservation-form-group selectProduct">
                <label>Selecionar Espaço(s)</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Selecione um espaços</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <button type="button" className="reservation-product-button" onClick={handleAddProduct}>Adicionar Espaço</button>
              </div>
              <table className="reservation-product-table">
                <thead>
                  <tr>
                    <th className="col-id">ID</th>
                    <th className="col-product">Espaço</th>
                    <th className="col-value">Valor</th>
                    <th className="col-hours">Horas</th>
                    <th className="col-total">Total</th>
                    <th className="col-remove"></th>
                  </tr>
                </thead>
                <tbody>
                  {addedProducts.map((product, index) => (
                    <tr key={index}>
                      <td className="col-id">{product.id}</td>
                      <td className="col-product">{product.name}</td>
                      <td className="col-value">R$ {product.hourlyRate}</td>
                      <td className="col-hours">{product.quantity}</td>
                      <td className="col-total">R$ {product.total.toFixed(2)}</td>
                      <td className="col-remove">
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="reservation-remove-button"
                        >
                          <img src={RemoveImageButton}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
          <form onSubmit={handleSubmit} className="reservation-total-form">
            <div className="reservation-total-container">
              <h3>Valor Total da Reserva: </h3>
              <p>R${totalValue.toFixed(2)}</p>
              <button type="submit" className="reservation-form-button">Criar Reserva</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReservationForm;