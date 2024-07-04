import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Body/Header";
import NavBar from "../Body/NavBar";
import Footer from "../Body/Footer";
import "./ReservationForm.css";
import { getUserInfo } from '../User/auth';

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

  const handleAddProduct = () => {
    const product = products.find((p) => p.id === parseInt(selectedProduct));
    if (product) {
      const productTotal = product.hourlyRate * duration;
      setAddedProducts([
        ...addedProducts,
        { ...product, quantity: duration, total: productTotal },
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
      alert("Reserva criada com sucesso!");

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
      alert("Error ao criar reserva");
    }
  };
  const user = getUserInfo();

  if (!user) {
    return <p>User not logged in</p>;
  }

  return (
    <>
      <Header />
      <NavBar />
      <main id="main" className="main">
        <div className="breadcrumb-container">
          <h1>Cadastro de Reservas</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">Cadastro</li>
              <li className="breadcrumb-item active">Cadastro de Reservas</li>
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
                  onChange={(e) => setDuration(e.target.value)}
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
                  <option value="Cancelada">Cancelada</option>
                  <option value="Finalizada">Finalizada</option>
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
                <label>Repetir (contagem)</label>
                <input
                  type="number"
                  value={repeatCount}
                  onChange={(e) => setRepeatCount(e.target.value)}
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
                <label>Selecionar Produto(s)</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Selecione um produto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <button type="button" className="reservation-product-button" onClick={handleAddProduct}>Adicionar Produto</button>
              </div>
              <table className="reservation-product-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Espaço</th>
                    <th>Valor</th>
                    <th>Horas</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {addedProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.hourlyRate}</td>
                      <td>{product.quantity}</td>
                      <td>{product.total}</td>
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